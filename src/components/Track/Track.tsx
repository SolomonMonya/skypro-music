import classNames from "classnames";
import styles from "./Track.module.css";
import { durationFormat } from "@/app/auxiliary/durationFormat";

type TrackBoxType = {
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  onClick: () => void;
};

export default function TrackBox({
  name,
  author,
  album,
  duration_in_seconds,
  onClick,
}: TrackBoxType) {
  const minutes = Math.floor(duration_in_seconds / 60);
  const seconds = duration_in_seconds % 60;

  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={classNames(styles.trackTitle, styles.title)}>
          <div onClick={onClick} className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="#">
              {name}
              <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={classNames(styles.trackAuthor, styles.author)}>
          <a className={styles.trackAuthorLink} href="#">
            {author}
          </a>
        </div>
        <div className={classNames(styles.trackAlbum, styles.album)}>
          <a className={styles.trackAlbumLink} href="#">
            {album}
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