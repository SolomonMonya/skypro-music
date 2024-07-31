import styles from "./PlayerBar.module.css";
import classNames from "classnames";

type PlayerControlsType = {
  togglePlay: () => void;
  isPlaying: boolean;
  toggleLoop: () => void;
  isLooping: boolean;
  nextTrack: () => void;
  prevTrack: () => void;
};

export function PlayerBar({
  togglePlay,
  isPlaying,
  toggleLoop,
  isLooping,
  nextTrack,
  prevTrack,
}: PlayerControlsType) {
  return (
    <div className={styles.playerBar}>
      <div className={styles.playerControls}>
        <div className={styles.playerBtnPrev} onClick={prevTrack}>
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
        <div className={styles.playerBtnNext} onClick={nextTrack}>
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
    </div>
  );
}