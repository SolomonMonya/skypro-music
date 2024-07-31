import TrackBox from "../Track/Track"
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { Track } from "@/app/Utilities/types";

type TrackType = {
  tracksData: Track[];
  setCurrentTrack: (param: Track | null) => void;
  setCurrentIndex: (param: number | null) => void;
};

export default function Playlist({ tracksData, setCurrentTrack, setCurrentIndex}: TrackType) {
  const handleTrackClick = (playlistItem: Track, index: number) => {
    setCurrentTrack(playlistItem);
    setCurrentIndex(index)
  };

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
        {tracksData.map((playlistItem, index) => (
          <TrackBox
            onClick={() => handleTrackClick(playlistItem, index)}
            currentTrack={playlistItem}
            key={`${playlistItem} + ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
