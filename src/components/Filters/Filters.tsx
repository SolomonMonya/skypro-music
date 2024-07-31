"use client";

import styles from "./Filters.module.css";
import { FilterItem } from "./FilterItem/FilterItem";
import { useEffect, useState } from "react";
import { Tracks, Track } from "@/app/auxiliary/types";

type FilterTracksProps = {
  track: Track[];
};

export default function Filters({ track }: FilterTracksProps) {
  const [filteredAuthorArr, setFilteredAuthorArr] = useState<string[]>([]);
  const [filteredGenreArr, setFilteredGenreArr] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    if (track) {
      const authors = track.map((trackData) => trackData.author);
      const uniqueAuthors = Array.from(new Set(authors));
      setFilteredAuthorArr(uniqueAuthors);

      const genres = track.map((trackData) => trackData.genre);
      const uniqueGenres = Array.from(new Set(genres));
      setFilteredGenreArr(uniqueGenres);
    }
  }, [track]);

  const filters = [
    {
      title: 'Исполнителю',
      list: filteredAuthorArr,
    },
    {
      title: 'Году выпуска',
      list: ['сначала новые', 'сначала старые', 'по умолчанию'],
    },
    {
      title: 'Жанру',
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
          isOpened={activeFilter === filter.title}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
          key={filter.title}
        />
      ))}
    </div>
  );
}
