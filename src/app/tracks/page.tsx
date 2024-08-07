"use client";

import styles from "./page.module.css";
import Main from "@/app/main";
import { Track } from "@/app/Utilities/types";
import { getTracks } from "@/api/api";
import { useEffect, useState } from "react";

export default async function Home() {
  
  const tracksList = await getTracks()


  if (!tracksList) return null;

  return (
    <div className={styles.wrapper}>
      <Main tracks={tracksList} />
    </div>
  );
}
