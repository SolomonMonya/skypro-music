import classNames from "classnames";
import styles from "./Track.module.css";
import { Track } from "@/app/utilities/types";
import { useAppDispatch, useAppSelector } from "@/app/utilities/hooks";
import { setCurrentTrack, setIsPlaying } from "@/app/utilities/store/features/playlistSlice";
import { durationFormat } from "@/app/utilities/durationFormat";

type TrackType = {
  track: Track;
}
 
export default function TrackBox({track}: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const dispatch = useAppDispatch();
  const { name, author, album, duration_in_seconds, id } = track;
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track }));
    dispatch(setIsPlaying(true));
  };
  return (
    <div className={styles.playlistItem} onClick={handleTrackClick}>
      <div className={styles.playlistTrack}>
        <div className={classNames(styles.trackTitle, styles.title)}>
          <div className={styles.trackTitleImage}>
          <svg className={classNames(styles.trackTitleSvg, {
                [styles.trackIconIsplaying]: isPlaying && isCurrentTrack,
              })}>
              <use xlinkHref={`img/icon/sprite.svg#${
                  isCurrentTrack ? "icon-isplaying" : "icon-note"
                }`} />
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
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
