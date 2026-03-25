import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 新增
import type { RootState } from "../../../store"; // 根据实际路径导入 RootState
import { mockTemplates } from "../mockData";
import { Button } from "../../../components/common";
import StyleSelector from "./components/StyleSelector";
import type { StyleOption } from "./components/StyleSelector";
import styles from "./style.module.css";
import { setPendingPrompt } from "../../History/storage";

// 模拟风格选项
const mockStyles: StyleOption[] = [
  { id: "s1", name: "标准", preview: "标准风格" },
  { id: "s2", name: "淡彩", preview: "淡彩效果" },
  { id: "s3", name: "浓墨", preview: "浓墨重彩" },
];

const TemplateDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 从 Redux 获取用户状态
  const user = useSelector((state: RootState) => state.user.userInfo);
  const template = mockTemplates.find((t) => t.id === id);

  const [liked, setLiked] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(mockStyles[0].id);

  if (!template) {
    return <div className={styles.notFound}>模板不存在</div>;
  }

  const handleLike = () => {
    if (!user) {
      alert("请先登录");
      return;
    }
    setLiked(!liked);
    // 实际项目中应调用API更新收藏
  };

  const handleGenerate = () => {
    if (!user) {
      alert("请先登录");
      return;
    }
    const pickedStyle = mockStyles.find((s) => s.id === selectedStyle);
    const nextPrompt = pickedStyle
      ? `${template.title}（${pickedStyle.name}）`
      : template.title;
    setPendingPrompt(nextPrompt);
    navigate(`/generate?template=${template.id}&style=${selectedStyle}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.imageSection}>
          <img
            src={template.cover[0]}
            alt={template.title}
            className={styles.cover}
          />
          <button
            className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            {liked ? "❤️ 已收藏" : "🤍 收藏"}
          </button>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{template.title}</h1>
          <p className={styles.category}>分类：{template.category}</p>
          <div className={styles.stats}>
            <span>⬇️ 下载 {template.downloads}</span>
            <span>❤️ 喜欢 {template.likes + (liked ? 1 : 0)}</span>
          </div>

          <StyleSelector
            options={mockStyles}
            selected={selectedStyle}
            onSelect={setSelectedStyle}
          />

          <div className={styles.actions}>
            <Button variant="primary" size="large" onClick={handleGenerate}>
              使用此模板生成
            </Button>
            {user?.membership !== "premium" && (
              <div className={styles.upgradeHint}>
                想要更多风格？<a href="/membership">升级会员</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
