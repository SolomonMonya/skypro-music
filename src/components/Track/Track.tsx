import styles from "./Track.module.css";
import { durationFormat } from "@/app/auxiliary/durationFormat";

type TrackType = {
  name: string;
  author: string; 
  album: string;
  duration: number;
  onClick: () => void; 
}
 
export default function TrackBox({name, author, album, onClick, duration}: TrackType) {
  return (
    <div onClick={onClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className="track__title-text">
            <a className={styles.trackTitleLink} href="/">
              {name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="/">
            {author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="/">
            {album}
          </a>
        </div>
        <div className="track__time">
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {durationFormat(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
