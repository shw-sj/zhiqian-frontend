export interface Template {
  id: string;
  title: string;
  cover: string;
  category: string;
  likes: number;
  downloads: number;
}

export const mockTemplates: Template[] = [
  {
    id: "1",
    title: "水墨山水",
    cover: "https://picsum.photos/300/200?random=5",
    category: "水墨",
    likes: 128,
    downloads: 34,
  },
  {
    id: "2",
    title: "赛博朋克",
    cover: "https://picsum.photos/300/200?random=6",
    category: "科幻",
    likes: 256,
    downloads: 120,
  },
  {
    id: "3",
    title: "油画人像",
    cover: "https://picsum.photos/300/200?random=7",
    category: "油画",
    likes: 98,
    downloads: 23,
  },
  {
    id: "4",
    title: "3D渲染",
    cover: "https://picsum.photos/300/200?random=8",
    category: "3D",
    likes: 312,
    downloads: 89,
  },
  {
    id: "5",
    title: "插画风",
    cover: "https://picsum.photos/300/200?random=9",
    category: "插画",
    likes: 187,
    downloads: 56,
  },
];

export const categories = ["全部", "水墨", "科幻", "油画", "3D", "插画"];
