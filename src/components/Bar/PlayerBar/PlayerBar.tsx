import { Track } from "@/app/utilities/types";
import styles from "./PlayerBar.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/app/utilities/hooks";
import { setIsLoop, setIsPlaying, setIsShuffle, setNextTrack, setPreviousTrack } from "@/app/utilities/store/features/playlistSlice";
import { useRef, useState } from "react";
import { RootState } from "@/app/utilities/store/store";


type PlayerControlsType = {
  isPlaying: boolean;
  isLooping: boolean;
  isShuffle: boolean;
  currentTrack: Track;

};

const PlayerBar: React.FC<PlayerControlsType> = ({

  isPlaying,
  isLooping,
  isShuffle,
}) => {

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  if (!currentTrack) {
    return null;
  }
  
  const dispatch = useAppDispatch();

  const handleNextTrack = () => {
    dispatch(setNextTrack());
  };

  const handlePrevTrack = () => {
    dispatch(setPreviousTrack());
  };


  const { name, author } = currentTrack;

  return (
    <div className={styles.playerBar}>
      <div className={styles.playerControls}>
        <div onClick={handlePrevTrack} className={styles.playerBtnPrev}>
          <svg className={styles.playerBtnPrevSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div onClick={() => dispatch(setIsPlaying(!isPlaying))} className={styles.playerBtnPlay}>
          <svg className={styles.playerBtnPlaySvg}>
            <use
              xlinkHref={`img/icon/sprite.svg#${
                isPlaying ? "icon-pause" : "icon-play"
              }`}
            />
          </svg>
        </div>
        <div
          onClick={handleNextTrack} 
          className={styles.playerBtnNext}>
          <svg className={styles.playerBtnNextSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div onClick={() => dispatch(setIsLoop(!isLooping))}
        className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L5 0.113249V5.88675L10 3ZM7 14.5C3.96243 14.5 1.5 12.0376 1.5 9H0.5C0.5 12.5899 3.41015 15.5 7 15.5V14.5ZM1.5 9C1.5 5.96243 3.96243 3.5 7 3.5V2.5C3.41015 2.5 0.5 5.41015 0.5 9H1.5Z" fill={isLooping ? "#fff" : "#696969"}/>
            <path d="M10 15L15 17.8868V12.1132L10 15ZM13 3.5C16.0376 3.5 18.5 5.96243 18.5 9H19.5C19.5 5.41015 16.5899 2.5 13 2.5V3.5ZM18.5 9C18.5 12.0376 16.0376 14.5 13 14.5V15.5C16.5899 15.5 19.5 12.5899 19.5 9H18.5Z" fill={isLooping ? "#fff" : "#696969"}/>
          </svg>
        </div>
        <div
          onClick={() => dispatch(setIsShuffle(!isShuffle))}
          className={classNames(styles.playerBtnShuffle, styles.btnIcon)}
        >
          <svg className={styles.playerBtnShuffleSvg}>
            <use
              xlinkHref={`img/icon/sprite.svg#${
                isShuffle ? "icon-shuffle-active" : "icon-shuffle"
              }`}
            />
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
            <span className={styles.trackPlayAuthorLink}>{name}</span>
          </div>
          <div className={styles.trackPlayAlbum}>
            <span className={styles.trackPlayAlbumLink}>{author}</span>
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
export default PlayerBar