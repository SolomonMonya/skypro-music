"use client";

import styles from "@/app/tracks/page.module.css";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Navigation/Navigation";
import Search from "@/components/Search/Search";
import Filters from "@/components/Filters/Filters";
import Playlist from "@/components/Playlist/Playlist";
import { Track } from "@/app/auxiliary/types";
import { useState } from "react";

type MainTrackCheck = {
  tracks: Track;
  setTracks: (tracks: Track) => void;
};

export default function Main({tracks, setTracks}: MainTrackCheck) {

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filters track={tracks} />
            <Playlist tracksData={tracks} setTracksData={setTracks}/>
          </div>
          <Sidebar />
        </main>
        {tracks && <Bar tracks={tracks} />}
        <footer className="footer" />
      </div>
  );
}
