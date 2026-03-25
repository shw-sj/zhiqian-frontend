import React from "react";
import stylesModule from "./style.module.css";

export interface StyleOption {
  id: string;
  name: string;
  preview: string;
}

interface Props {
  options: StyleOption[];
  selected: string;
  onSelect: (styleId: string) => void;
}

const StyleSelector: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <div className={stylesModule.selector}>
      <h3>选择风格变体</h3>
      <div className={stylesModule.list}>
        {options.map((style) => (
          <div
            key={style.id}
            className={`${stylesModule.item} ${
              selected === style.id ? stylesModule.active : ""
            }`}
            onClick={() => onSelect(style.id)}
          >
            <span className={stylesModule.name}>{style.name}</span>
            <span className={stylesModule.preview}>{style.preview}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
