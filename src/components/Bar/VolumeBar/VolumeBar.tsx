import { VolumeType } from "@/app/auxiliary/types";
import styles from "./VolumeBar.module.css";
import classNames from "classnames";

export default function Volume({ min, max, step, value, onChange }: VolumeType) {

  return (
    <div className={styles.barPlayerVolume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={styles.volumeProgress}>
          <input
            className={styles.volumeLine}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}