import React, { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import TemplateCard from "./components/TemplateCard";
import { mockTemplates, categories } from "./mockData";
import styles from "./style.module.css";

const TemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 计算每个分类的模板数量
  const categoryCounts = categories.reduce((acc, cat) => {
    if (cat === "全部") {
      acc[cat] = mockTemplates.length;
    } else {
      acc[cat] = mockTemplates.filter((t) => t.category === cat).length;
    }
    return acc;
  }, {} as Record<string, number>);

  // 根据选中分类过滤模板
  const filteredTemplates =
    selectedCategory === "全部"
      ? mockTemplates
      : mockTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>模板市场</h1>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        counts={categoryCounts} // 新增：传递数量数据
      />
      <div className={styles.grid}>
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
