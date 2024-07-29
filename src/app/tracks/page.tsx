"use client";

import styles from "./page.module.css";
import Main from "@/app/main";
import { Track } from "@/app/auxiliary/types";
import { getTracks } from "@/api/api";
import { useEffect, useState } from "react";

export default function Home() {

  const [tracksList, setTracksList] = useState<Track | null>(null);
  
  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [setTracksList]);

  if (!tracksList || !setTracksList) return;

  return (
    <div className={styles.wrapper}>
      <Main tracks={tracksList} setTracks={setTracksList}/>
    </div>
  )
};