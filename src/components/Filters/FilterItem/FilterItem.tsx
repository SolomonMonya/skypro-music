import classnames from "classnames";
import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export function FilterItem({ isOpened, handleFilterClick, title, list }: FilterItemType) {
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.BtnText, {
          [styles.active]: isOpened,
        })}
      >
        {title}
      </div>
      {isOpened && (
        <div className={styles.activeFilterContainer}>
          <ul className={styles.activeFilter}>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}