import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>智创千面</div>
        <nav className={styles.nav}>
          <Link to="/">首页</Link>
          <Link to="/templates">模板市场</Link>
          <Link to="/membership">会员中心</Link>
        </nav>
        <div className={styles.user}>未登录</div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>© 2025 智创千面</footer>
    </div>
  );
};

export default MainLayout;
