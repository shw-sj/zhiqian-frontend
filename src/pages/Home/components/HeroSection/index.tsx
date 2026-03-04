import React from "react";
import { Button } from "../../../../components/common";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>智创千面 · 你的AI绘画助手</h1>
      <p className={styles.subtitle}>输入描述，一键生成专属画作</p>
      <Button
        size="large"
        variant="primary"
        onClick={() => navigate("/templates")}
      >
        开始创作
      </Button>
    </div>
  );
};

export default HeroSection;
