import styles from "./Playlist.module.css";
import classNames from "classnames";
import TrackBox from "../Track/Track";
import { Track } from "@/app/Utilities/types";

type TrackType = {
  tracksData: Track[];
  setCurrentTrack: (track: Track | null, index: number | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;

};

export default function Playlist({ tracksData, setCurrentTrack, setIsPlaying }: TrackType) {
  const handleTrackClick = (playlistItem: Track, index: number) => {
    console.log(playlistItem, index)
    setCurrentTrack(playlistItem, index);
    setIsPlaying(true)
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
            key={`${playlistItem.id}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
