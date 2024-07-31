"use client";

import styles from "@/app/tracks/page.module.css";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Navigation/Navigation";
import Search from "@/components/Search/Search";
import Filters from "@/components/Filters/Filters";
import Playlist from "@/components/Playlist/Playlist";
import { Track } from "@/app/Utilities/types";
import { useState } from "react";
type MainTrackCheck = {
  tracks: Track[];
  setTracks: (tracks: Track[]) => void;
};

export default function Main({ tracks, setTracks }: MainTrackCheck) {
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  if (currentIndex === null) return
  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[currentIndex]);



  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <div className={styles.mainCenterblock}>
          <Search />
          <h2 className={styles.centerblockH2}>Треки</h2>
          <Filters track={tracks} setFilteredTracks={setFilteredTracks} />
          <Playlist tracksData={filteredTracks} setCurrentTrack={setCurrentTrack} setCurrentIndex={setCurrentIndex} />
        </div>
        <Sidebar />
      </main>
      {filteredTracks && <Bar tracksData={filteredTracks}  track={currentTrack} index={currentIndex} />}
      <footer className="footer" />
    </div>
  );
}
