export interface Template {
  id: string;
  title: string;
  cover: string;
  category: string;
  likes: number;
}

export const mockTemplates: Template[] = [
  {
    id: "1",
    title: "水墨山水",
    cover: "https://picsum.photos/300/200?random=1",
    category: "水墨",
    likes: 128,
  },
  {
    id: "2",
    title: "赛博朋克",
    cover: "https://picsum.photos/300/200?random=2",
    category: "科幻",
    likes: 256,
  },
  {
    id: "3",
    title: "油画人像",
    cover: "https://picsum.photos/300/200?random=3",
    category: "油画",
    likes: 98,
  },
  {
    id: "4",
    title: "3D渲染",
    cover: "https://picsum.photos/300/200?random=4",
    category: "3D",
    likes: 312,
  },
];

export interface Style {
  id: string;
  name: string;
  icon: string;
}

export const mockStyles: Style[] = [
  { id: "s1", name: "水墨", icon: "🎨" },
  { id: "s2", name: "油画", icon: "🖼️" },
  { id: "s3", name: "3D渲染", icon: "🧊" },
  { id: "s4", name: "插画", icon: "✏️" },
];

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const mockFeatures: Feature[] = [
  {
    id: "f1",
    title: "智能生成",
    description: "输入描述即可生成高质量图片",
    icon: "🤖",
  },
  {
    id: "f2",
    title: "海量模板",
    description: "覆盖多种风格，任你挑选",
    icon: "📚",
  },
  {
    id: "f3",
    title: "高清输出",
    description: "最高支持 4K 分辨率",
    icon: "✨",
  },
];
