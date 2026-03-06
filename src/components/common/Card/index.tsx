import React from "react";
import styles from "./style.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.card} ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
