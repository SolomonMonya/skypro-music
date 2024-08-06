import styles from "./page.module.css";
import Main from "@/app/main";
import { Track } from "@/app/utilities/types";
import { getTracks } from "@/api/api";
// import { useEffect, useState } from "react";
import { useAppDispatch } from "../utilities/hooks";
import { setCurrentPlaylist } from "../utilities/store/features/playlistSlice";

export default async function Home() {
  const tracksList = await getTracks()
 

  if (!tracksList) return null;

  return (
    <div className={styles.wrapper}>
      <Main tracks={tracksList}/>
    </div>
  );
}
