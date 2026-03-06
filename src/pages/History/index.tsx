import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 定义数据接口
interface IHistoryItem {
  id: string;
  url: string;
  prompt: string;
  createdAt: string;
  tag: string;
}

const HistoryPage: React.FC = () => {
  const [list, setList] = useState<IHistoryItem[]>([]);
  const navigate = useNavigate();

  // 2. 模拟更真实的数据用于展示
  useEffect(() => {
    const mockData: IHistoryItem[] = [
      { id: '1', url: 'https://picsum.photos/seed/art1/400/300', prompt: '黄昏时期的乡野景色', createdAt: '2026-02-25', tag: '风格选择' },
      { id: '2', url: 'https://picsum.photos/seed/art2/400/300', prompt: '茫茫大漠的旅行者', createdAt: '2026-02-24', tag: '创意生成' },
      { id: '3', url: 'https://picsum.photos/seed/art3/400/300', prompt: '宁静风格水面', createdAt: '2026-02-23', tag: '壁纸' },
      { id: '4', url: 'https://picsum.photos/seed/art4/400/300', prompt: '现代都市景色', createdAt: '2026-02-22', tag: '壁纸' },
    ];
    setList(mockData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 头部区域：对应 C 任务中的搜索与筛选占位 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">历史记录</h1>
          <p className="text-gray-500 text-sm">管理您创作的所有视觉作品</p>
        </div>
        <div className="flex gap-3">
          {/* 模拟搜索框占位 */}
          <div className="px-4 py-2 border border-gray-200 rounded-lg text-gray-400 text-sm w-64 bg-gray-50">
            搜索关键词...
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
            筛选
          </button>
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition"
            onClick={() => navigate('/')}
          >
            返回首页
          </button>
        </div>
      </div>

      {/* 图片网格：对应 C 任务中的图库网格展示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((item) => (
          <div key={item.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            {/* 图片容器 */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                src={item.url} 
                alt={item.prompt} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] rounded">
                {item.tag}
              </div>
            </div>
            
            {/* 描述信息 */}
            <div className="p-4">
              <p className="text-sm text-gray-700 line-clamp-2 mb-2 min-h-[40px]">
                {item.prompt}
              </p>
              <div className="flex justify-between items-center text-[11px] text-gray-400">
                <span>{item.createdAt}</span>
                <span className="hover:text-red-500">❤️ 收藏</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;