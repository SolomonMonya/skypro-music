import classNames from "classnames";
import styles from "./Track.module.css";
import { Track } from "@/app/Utilities/types";

type TrackBoxProps = {
  currentTrack: Track | null;
  onClick: () => void
  
};

export default function TrackBox({ currentTrack, onClick }: TrackBoxProps) {
  if (!currentTrack) return null;
  const minutes = Math.floor(currentTrack.duration_in_seconds / 60);
  const seconds = currentTrack.duration_in_seconds % 60;

  return (
    <div className={styles.playlistItem} onClick={onClick}>
      <div className={styles.playlistTrack}>
        <div className={classNames(styles.trackTitle, styles.title)}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="#">
              {currentTrack.name}
              <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={classNames(styles.trackAuthor, styles.author)}>
          <a className={styles.trackAuthorLink} href="#">
            {currentTrack.author}
          </a>
        </div>
        <div className={classNames(styles.trackAlbum, styles.album)}>
          <a className={styles.trackAlbumLink} href="#">
            {currentTrack.album}
          </a>
        </div>
        <div className={classNames(styles.trackTime, styles.time)}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
