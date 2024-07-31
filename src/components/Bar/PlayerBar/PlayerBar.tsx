import styles from "./PlayerBar.module.css";
import classNames from "classnames";

type PlayerControlsType = {
  togglePlay: () => void;
  isPlaying: boolean;
  toggleLoop: () => void;
  isLooping: boolean;
  nextTrack: () => void;
  prevTrack: () => void;
  trackName: string;
  trackAuthor: string;
};

export function PlayerBar({
  togglePlay,
  isPlaying,
  toggleLoop,
  isLooping,
  nextTrack,
  prevTrack,
  trackName,
  trackAuthor,
}: PlayerControlsType) {
  return (
    <div className={styles.playerBar}>
      <div className={styles.playerControls}>
        <div onClick={prevTrack} className={styles.playerBtnPrev}>
          <svg className={styles.playerBtnPrevSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div onClick={togglePlay} className={styles.playerBtnPlay}>
          <svg className={styles.playerBtnPlaySvg}>
            <use
              xlinkHref={`img/icon/sprite.svg#${
                isPlaying ? "icon-pause" : "icon-play"
              }`}
            />
          </svg>
        </div>
        <div onClick={nextTrack} className={styles.playerBtnNext}>
          <svg className={styles.playerBtnNextSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div onClick={toggleLoop} className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
          <svg className={styles.playerBtnRepeatSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLooping ? "icon-repeat"  : "icon-repeat-toggled"
              }`}
            />
          </svg>
        </div>
        <div className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
          <svg className={styles.playerBtnShuffleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
          </svg>
        </div>
      </div>
      <div className={styles.playerTrackPlay}>
        <div className={styles.trackPlayContain}>
          <div className={styles.trackPlayImage}>
            <svg className={styles.trackPlaySvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackPlayAuthor}>
            <span className={styles.trackPlayAuthorLink}>{trackName}</span>
          </div>
          <div className={styles.trackPlayAlbum}>
            <span className={styles.trackPlayAlbumLink}>{trackAuthor}</span>
          </div>
        </div>
        <div className={styles.trackPlayLikeDis}>
          <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
            <svg className={styles.trackPlayLikeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-like" />
            </svg>
          </div>
          <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
            <svg className={styles.trackPlayDislikeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
            </svg>
          </div>
        </div>
      </div>

    </div>

  );
}