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
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L5 0.113249V5.88675L10 3ZM7 14.5C3.96243 14.5 1.5 12.0376 1.5 9H0.5C0.5 12.5899 3.41015 15.5 7 15.5V14.5ZM1.5 9C1.5 5.96243 3.96243 3.5 7 3.5V2.5C3.41015 2.5 0.5 5.41015 0.5 9H1.5Z" fill={isLooping ? "#fff" : "#696969"}/>
            <path d="M10 15L15 17.8868V12.1132L10 15ZM13 3.5C16.0376 3.5 18.5 5.96243 18.5 9H19.5C19.5 5.41015 16.5899 2.5 13 2.5V3.5ZM18.5 9C18.5 12.0376 16.0376 14.5 13 14.5V15.5C16.5899 15.5 19.5 12.5899 19.5 9H18.5Z" fill={isLooping ? "#fff" : "#696969"}/>
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