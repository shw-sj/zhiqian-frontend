import React from "react";
import styles from "./style.module.css";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  counts?: Record<string, number>; // 可选：每个分类的模板数量
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selected,
  onSelect,
  counts = {},
}) => {
  return (
    <div className={styles.filter}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.category} ${
            selected === cat ? styles.active : ""
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
          {counts[cat] !== undefined && (
            <span className={styles.count}>{counts[cat]}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
