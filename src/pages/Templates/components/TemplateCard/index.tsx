import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { Card } from "../../../../components/common"; // 确保这个路径正确，如果不存在则需调整
import { Template } from "../../mockData";
import styles from "./style.module.css";

interface Props {
  template: Template;
}

const TemplateCard: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("请先登录");
      return;
    }
    setLiked(!liked);
    // 后续可调用 API
  };

  return (
    <Card
      className={styles.card}
      onClick={() => navigate(`/templates/${template.id}`)}
    >
      <div className={styles.imageWrapper}>
        <img
          src={template.cover}
          alt={template.title}
          className={styles.cover}
        />
        <button
          className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
          onClick={handleLike}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{template.title}</h3>
        <p className={styles.category}>{template.category}</p>
        <div className={styles.stats}>
          <span>⬇️ {template.downloads}</span>
          <span>❤️ {template.likes + (liked ? 1 : 0)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;
