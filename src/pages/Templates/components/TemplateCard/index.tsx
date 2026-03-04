import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../../components/common";
import { Template } from "../../mockData";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import styles from "./style.module.css";

interface Props {
  template: Template;
}

const TemplateCard: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate(); // 获取 navigate 函数
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止冒泡，避免触发卡片点击
    if (!isLoggedIn) {
      // 使用 isLoggedIn 判断登录状态
      alert("请先登录");
      return;
    }
    setLiked(!liked);
    // 这里可以调用 API 更新收藏状态
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
