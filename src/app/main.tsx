"use client";

import styles from "@/app/tracks/page.module.css";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Navigation/Navigation";
import Search from "@/components/Search/Search";
import Filters from "@/components/Filters/Filters";
import Playlist from "@/components/Playlist/Playlist";
import { Track } from "@/app/utilities/types";
import { useState } from "react";
import { useAppDispatch } from "./utilities/hooks";
import { setCurrentPlaylist } from "./utilities/store/features/playlistSlice";

type MainTrackCheck = {
  tracks: Track[];
};

export default function Main({ tracks }: MainTrackCheck) {
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);
  const dispatch = useAppDispatch();
  dispatch(setCurrentPlaylist(tracks));
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <div className={styles.mainCenterblock}>
          <Search />
          <h2 className={styles.centerblockH2}>Треки</h2>
          <Filters track={tracks} setFilteredTracks={setFilteredTracks} />
          <Playlist
            tracksData={filteredTracks}
          />
        </div>
        <Sidebar />
      </main>
      {filteredTracks && (
        <Bar/>
      )}
      <footer className="footer" />
    </div>
  );
}
