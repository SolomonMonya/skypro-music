"use client";

import styles from "./page.module.css";
import Main from "@/app/main";
import { Track } from "@/app/utilities/types";
import { getTracks } from "@/api/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [tracksList, setTracksList] = useState<Track[] | null>(null);

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  if (!tracksList) return null;

  return (
    <div className={styles.wrapper}>
      <Main tracks={tracksList}/>
    </div>
  );
}
