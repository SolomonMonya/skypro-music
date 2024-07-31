import TrackBox from "../Track/Track"
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { Track } from "@/app/Utilities/types";

type TrackType = {
  setTracksData: (param: Track[]) => void;
  tracksData: Track[];
};

export default function Playlist({ tracksData, setTracksData }: TrackType) {
  const handleTrackClick = (playlistItem: Track) => {
    setTracksData([playlistItem]);
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
        {tracksData.map((playlistItem) => (
          <TrackBox
            onClick={() => handleTrackClick(playlistItem)}
            key={playlistItem.id}
            name={playlistItem.name}
            author={playlistItem.author}
            album={playlistItem.album}
            duration_in_seconds={playlistItem.duration_in_seconds}
          />
        ))}
      </div>
    </div>
  );
}
