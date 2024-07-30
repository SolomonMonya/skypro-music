"use client";

import styles from "./Filters.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";
import { trackType } from "@/app/auxiliary/types";

type TrackType = {
  tracksData: trackType[];
}



export default function Filters({tracksData}: TrackType) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const authorArr = tracksData.map((trackData) => (trackData.author));
    const filteredAuthorArr: string[] = [];
    for (const value of authorArr) {
        let exists = false;
        for (const unique of filteredAuthorArr) { 
            if (unique === value) {
                exists = true;
                break;
            }
        }
        if (!exists) { 
          filteredAuthorArr.push(value); 
        }
    }

    const genreArr = tracksData.map((trackData) => (trackData.genre));
    const filteredGenreArr: string[] = [];
    for (const value of genreArr) {
        let exists = false;
        for (const unique of filteredGenreArr) { 
            if (unique === value) {
                exists = true;
                break;
            }
        }
        if (!exists) { 
          filteredGenreArr.push(value); 
        }
    }

  const filters = [
    {
      title: "Исполнителю",
      list: filteredAuthorArr,
    },
    {
      title: "Году выпуска",
      list: ["сначала новые", "сначала старые", "по умолчанию"],
    },
    {
      title: "Жанру",
      list: filteredGenreArr,
    },
  ];

  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          isOpened={activeFilter === filter.title ? true : false}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
          key={filter.title}
        />
      ))}
    </div>
  );
}
