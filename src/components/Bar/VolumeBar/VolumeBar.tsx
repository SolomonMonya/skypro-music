import { VolumeType } from "@/app/utilities/types";
import styles from "./VolumeBar.module.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
type VolumeSliderProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const Volume: React.FC<VolumeSliderProps> = ({ audioRef }) => {
  const [value, setValue] = useState<number>(0.1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, [value, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={styles.volumeProgress}>
          <input
            className={styles.volumeProgressLine}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
export default Volume