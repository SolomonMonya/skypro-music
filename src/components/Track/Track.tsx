import { useAppSelector, useAppDispatch } from "@/app/auxiliary/hooks";
import styles from "./Track.module.css";
import { durationFormat } from "@/app/auxiliary/durationFormat";
import { setCurrentTrack, setIsPlaying } from "@/app/auxiliary/store/features/PlaylistSlice";
import { Track } from "@/app/auxiliary/types";
import classNames from "classnames";

type TrackType = {
  track: Track;
  tracksData: Track[];
}
 
export default function TrackBox({track, tracksData }: TrackType) {

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const dispatch = useAppDispatch();
  const { name, author, album, duration_in_seconds, id } = track;
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;

  const HandleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(setIsPlaying(true));
  };
  return (
    <div onClick={HandleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={classNames(styles.trackTitleSvg, {
                [styles.trackIconIsplaying]: isPlaying && isCurrentTrack,
              })}>
              <use xlinkHref={`img/icon/sprite.svg#${
                  isCurrentTrack ? "icon-isplaying" : "icon-note"
                }`} />
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
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
