export interface Template {
  id: string;
  title: string;
  cover: string[];
  category: string;
  likes: number;
  downloads: number;
}

export const mockTemplates: Template[] = [
  {
    id: "1",
    title: "水墨山水",
    cover: [
      "/src/base_image/shuimo/1687741754142411.png",
      "/src/base_image/shuimo/1687741755991134.png",
      "/src/base_image/shuimo/1687741764274817.png",
      "/src/base_image/shuimo/1687741755991134.png",
      "/src/base_image/shuimo/1687741765269943.png",
      "/src/base_image/shuimo/1689131630614401.png"
    ],
    category: "水墨",
    likes: 128,
    downloads: 34,
  },
  {
    id: "2",
    title: "赛博朋克",
    cover: [
      "/src/base_image/saibo/1692741063_663174.jpg",
      "/src/base_image/saibo/R-C (1).jpg",
      "/src/base_image/saibo/R-C (2).jpg",
      "/src/base_image/saibo/ss_9284d1c5b248726760233a933dbb83757d7d5d95.1920x1080.jpg"
    ],
    category: "科幻",
    likes: 256,
    downloads: 120,
  },
  {
    id: "3",
    title: "油画人像",
    cover: [
      "/src/base_image/youhua/20201015104336_fee55.jpeg",
      "/src/base_image/youhua/338468498258834766-810x1024.jpg",
      "/src/base_image/youhua/b583-fyrwsqi0072378.jpg",
      "/src/base_image/youhua/fd26-fyrwsqi0072675.jpg",
      "/src/base_image/youhua/w700d1q75cms.jpg"
    ],
    category: "油画",
    likes: 98,
    downloads: 23,
  },
  {
    id: "4",
    title: "3D渲染",
    cover: [
      "/src/base_image/3d/20220707105336_736.jpg",
      "/src/base_image/3d/343ce2cae167ab3a3c3bd075e222a99d.png",
      "/src/base_image/3d/7526.jpg_wh860.png",
      "/src/base_image/3d/true.jpg"
    ],
    category: "3D",
    likes: 312,
    downloads: 89,
  },
  {
    id: "5",
    title: "插画风",
    cover: [
      "/src/base_image/cahhua/OIP-C.webp",
      "/src/base_image/cahhua/R-C.jpg",
      "/src/base_image/cahhua/R-C (1).jpg",
      "/src/base_image/cahhua/R-C (2).jpg"
    ],
    category: "插画",
    likes: 187,
    downloads: 56,
  },
];

export const categories = ["全部", "水墨", "科幻", "油画", "3D", "插画"];
