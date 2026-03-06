import React from "react";
import { Card, Button } from "../../../../components/common";
import { Plan } from "../../mockData";
import styles from "./style.module.css";

interface Props {
  plan: Plan;
}

const PlanCard: React.FC<Props> = ({ plan }) => {
  return (
    <Card className={`${styles.card} ${plan.popular ? styles.popular : ""}`}>
      {plan.popular && <div className={styles.popularTag}>热门推荐</div>}
      <h3 className={styles.name}>{plan.name}</h3>
      <div className={styles.price}>
        <span className={styles.currency}>¥</span>
        <span className={styles.amount}>{plan.price}</span>
        <span className={styles.unit}>/月</span>
      </div>
      <div className={styles.credits}>包含 {plan.credits} 次生成</div>
      <ul className={styles.features}>
        {plan.features.map((f, idx) => (
          <li key={idx}>✓ {f}</li>
        ))}
      </ul>
      <Button
        variant={plan.popular ? "primary" : "outline"}
        className={styles.button}
      >
        立即开通
      </Button>
    </Card>
  );
};

export default PlanCard;
