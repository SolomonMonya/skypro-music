import { getTracks } from "@/api/api";
import TrackBox from "../Track/Track"
import styles from "./Plaulist.module.css";
import classNames from "classnames";
import { Track } from "@/app/auxiliary/types";
import { useEffect, useState } from "react";

type TrackType = {
  setTracksData: (param: Track) => void;
  tracksData: Track[]
}

export default function Playlist ({tracksData, setTracksData}: TrackType) {

  return (
    <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.contentPlaylist}>
          {tracksData.map((playlistItem: any) => (
            <TrackBox 
            key={playlistItem.id} track={playlistItem} tracksData={tracksData}

          />
          ))}
        </div>
      </div>
  )
}