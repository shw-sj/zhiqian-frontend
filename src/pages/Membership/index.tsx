import React from "react";
import { useSelector } from "react-redux"; // 新增
import type { RootState } from "../../store"; // 根据实际路径导入 RootState
import PlanCard from "./components/PlanCard";
import { mockPlans } from "./mockData";
import styles from "./style.module.css";

const MembershipPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo); // 从 Redux 获取用户

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>会员中心</h1>
      <div className={styles.userInfo}>
        {user ? (
          <p>
            当前会员等级：
            <strong>
              {user.membership === "premium" ? "专业版" : "基础版"}
            </strong>
          </p>
        ) : (
          <p>请先登录</p>
        )}
      </div>
      <div className={styles.plans}>
        {mockPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default MembershipPage;
