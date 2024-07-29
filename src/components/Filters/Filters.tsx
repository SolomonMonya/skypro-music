"use client";

import styles from "./Filters.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";
import { Track } from "@/app/auxiliary/types";

type filterTracks = {
  track: Track
}

export default function Filters({track}: filterTracks) {

    const filteredAuthorArr: Object[] = [];
    const authorArr = track.map((trackData: any) => (trackData.author));
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

    const genreArr = track.map((trackData: any) => (trackData.genre));
    const filteredGenreArr: Object[] = [];
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
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
