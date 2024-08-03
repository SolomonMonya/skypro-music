"use client";

import styles from "./Filters.module.css";
import { FilterItem } from "./FilterItem/FilterItem";
import { useEffect, useState } from "react";
import { Track } from "@/app/utilities/types";
import { useAppDispatch } from "@/app/utilities/hooks";
import { setCurrentPlaylist } from "@/app/utilities/store/features/playlistSlice";

type FilterTracksProps = {
  track: Track[];
  setFilteredTracks: (tracks: Track[]) => void;
};

export default function Filters({ track, setFilteredTracks }: FilterTracksProps) {
  const [filteredAuthorArr, setFilteredAuthorArr] = useState<string[]>([]);
  const [filteredGenreArr, setFilteredGenreArr] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (track) {
      const authors = track.map((trackData) => trackData.author);
      const uniqueAuthors = Array.from(new Set(authors));
      setFilteredAuthorArr(uniqueAuthors);

      const genres = track.flatMap((trackData) => trackData.genre);
      const uniqueGenres = Array.from(new Set(genres));
      setFilteredGenreArr(uniqueGenres);
    }
  }, [track]);

  useEffect(() => {
    filterTracks();
  }, [selectedAuthor, selectedGenre, selectedYear]);

  const filters = [
    {
      title: 'Исполнителю',
      list: filteredAuthorArr,
      onSelect: (author: string | null) => setSelectedAuthor(author),
    },
    {
      title: 'Году выпуска',
      list: ['сначала новые', 'сначала старые', 'по умолчанию'],
      onSelect: (year: string | null) => setSelectedYear(year),
    },
    {
      title: 'Жанру',
      list: filteredGenreArr,
      onSelect: (genre: string | null) => setSelectedGenre(genre),
    },
  ];

  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  function filterTracks() {
    let filteredTracks = track;

    if (selectedAuthor) {
      filteredTracks = filteredTracks.filter((t) => t.author === selectedAuthor);
    }

    if (selectedGenre) {
      filteredTracks = filteredTracks.filter((t) => t.genre.includes(selectedGenre));
    }

    if (selectedYear) {
      filteredTracks = filteredTracks.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        if (selectedYear === 'сначала новые') {
          return dateB.getTime() - dateA.getTime();
        } else if (selectedYear === 'сначала старые') {
          return dateA.getTime() - dateB.getTime();
        }
        return 0;
      });
    }

    dispatch(setCurrentPlaylist(filteredTracks));
  }

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          isOpened={activeFilter === filter.title}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
          onSelect={filter.onSelect}
        />
      ))}
    </div>
  );
}
