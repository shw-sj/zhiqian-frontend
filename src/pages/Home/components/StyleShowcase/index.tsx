import React from "react";
import { Style } from "../../mockData";
import styles from "./style.module.css";

interface Props {
  styles: Style[];
}

const StyleShowcase: React.FC<Props> = ({ styles }) => {
  return (
    <div className={styles.list}>
      {styles.map((s) => (
        <div key={s.id} className={styles.item}>
          <span className={styles.icon}>{s.icon}</span>
          <span>{s.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StyleShowcase;
