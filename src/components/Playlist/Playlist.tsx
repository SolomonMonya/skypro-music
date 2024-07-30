import { getTracks } from "@/api/api";
import Track from "../Track/Track"
import styles from "./Plaulist.module.css";
import classNames from "classnames";
import { trackType } from "@/app/auxiliary/types";

type TrackType = {
  playlist: trackType[]; 
}

export default async function Playlist ({playlist}: TrackType) {

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
          {playlist.map((playlistItem) => (
            <Track key={playlistItem.id}
            name={playlistItem.name}
            author={playlistItem.author}
            album={playlistItem.album}
            />
          ))}
        </div>
      </div>
  )
}