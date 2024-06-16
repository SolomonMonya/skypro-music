import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Navigation/Navigation";
import Search from "@/components/Search/Search";
import Filters from "@/components/Filters/Filters";
import Playlist from "@/components/Playlist/Playlist";
import { useEffect, useState } from "react";
import { trackType } from "@/app/auxiliary/types";
import { getTracks } from "@/api/api";


export default async function Home() {

  let tracksData: trackType[];
 
  try {
    tracksData = await getTracks();
  } catch (error:any) {
    throw new Error(error.message);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filters tracksData={tracksData} />
            <Playlist playlist={tracksData} />
          </div>
          <Sidebar />
        </main>
        <Bar /> 
        <footer className="footer" />
      </div>
    </div>
  );
}
