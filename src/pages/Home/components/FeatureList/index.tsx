import React from "react";
import { Feature } from "../../mockData";
import styles from "./style.module.css";

interface Props {
  features: Feature[];
}

const FeatureList: React.FC<Props> = ({ features }) => {
  return (
    <div className={styles.grid}>
      {features.map((f) => (
        <div key={f.id} className={styles.feature}>
          <div className={styles.icon}>{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
