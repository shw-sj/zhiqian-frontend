import React from "react";
import styles from "./style.module.css";

interface Style {
  id: string;
  name: string;
  preview: string;
}

interface Props {
  styles: Style[];
  selected: string;
  onSelect: (styleId: string) => void;
}

const StyleSelector: React.FC<Props> = ({ styles, selected, onSelect }) => {
  return (
    <div className={styles.selector}>
      <h3>选择风格变体</h3>
      <div className={styles.list}>
        {styles.map((style) => (
          <div
            key={style.id}
            className={`${styles.item} ${
              selected === style.id ? styles.active : ""
            }`}
            onClick={() => onSelect(style.id)}
          >
            <span className={styles.name}>{style.name}</span>
            <span className={styles.preview}>{style.preview}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
