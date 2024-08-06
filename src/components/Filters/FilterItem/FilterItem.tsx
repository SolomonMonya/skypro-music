import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  onSelect: (value: string | null) => void;
};

export function FilterItem({ isOpened, handleFilterClick, title, list, onSelect }: FilterItemType) {
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
              <li key={item} onClick={() => onSelect(item)}>
                {item}
              </li>
            ))}
            <li onClick={() => onSelect(null)}>Сбросить</li>
          </ul>
        </div>
      )}
    </div>
  );
}
