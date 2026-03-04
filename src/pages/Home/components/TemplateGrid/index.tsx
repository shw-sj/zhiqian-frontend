import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../../components/common";
import { Template } from "../../mockData";
import styles from "./style.module.css";

interface Props {
  templates: Template[];
}

const TemplateGrid: React.FC<Props> = ({ templates }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      {templates.map((t) => (
        <Card
          key={t.id}
          className={styles.card}
          onClick={() => navigate(`/templates/${t.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={t.cover} alt={t.title} className={styles.cover} />
          <div className={styles.info}>
            <h3>{t.title}</h3>
            <span className={styles.category}>{t.category}</span>
            <span className={styles.likes}>❤️ {t.likes}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TemplateGrid;
