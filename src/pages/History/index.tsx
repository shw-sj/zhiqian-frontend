import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearHistoryItems,
  loadHistoryItems,
  saveHistoryItems,
  setPendingPrompt,
  type HistoryItem,
} from "./storage";

const formatTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
};

const downloadImage = (url: string, id: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `generated-${id}.png`;
  link.click();
};

const HistoryPage = () => {
  const [list, setList] = useState<HistoryItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("全部");
  const navigate = useNavigate();

  useEffect(() => {
    setList(loadHistoryItems());
  }, []);

  const tags = useMemo(() => {
    return ["全部", ...Array.from(new Set(list.map((item) => item.tag)))];
  }, [list]);

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const keywordMatched =
        !keyword.trim() ||
        item.prompt.toLowerCase().includes(keyword.trim().toLowerCase());
      const tagMatched = selectedTag === "全部" || item.tag === selectedTag;
      return keywordMatched && tagMatched;
    });
  }, [keyword, list, selectedTag]);

  const handleDelete = (id: string) => {
    const next = list.filter((item) => item.id !== id);
    setList(next);
    saveHistoryItems(next);
  };

  const handleClear = () => {
    if (!list.length) return;
    const confirmed = window.confirm("确认清空全部历史记录吗？");
    if (!confirmed) return;
    clearHistoryItems();
    setList([]);
  };

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      color: '#1f2937'
    }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            marginBottom: '16px',
            color: '#111827'
          }}>历史记录</h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>管理您创作的所有视觉作品，随时回顾和重新生成</p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px',
            width: '100%',
            '@media (min-width: 768px)': {
              width: 'auto'
            }
          }}>
            <input
              style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#1f2937',
                fontSize: '14px',
                width: '100%',
                '@media (min-width: 768px)': {
                  width: '280px'
                },
                transition: 'all 0.2s'
              }}
              placeholder="搜索提示词..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#1f2937',
                fontSize: '14px',
                width: '100%',
                '@media (min-width: 768px)': {
                  width: '180px'
                },
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                transition: 'all 0.2s'
              }}
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            width: '100%',
            '@media (min-width: 768px)': {
              width: 'auto',
              justifyContent: 'flex-end'
            }
          }}>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: list.length ? 'pointer' : 'not-allowed',
                opacity: list.length ? 1 : 0.5,
                transition: 'background-color 0.2s'
              }}
              onClick={handleClear}
              type="button"
              disabled={!list.length}
            >
              清空历史
            </button>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={() => navigate("/generate")}
              type="button"
            >
              去生成页
            </button>
          </div>
        </div>
      </div>

      {!filteredList.length ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          border: '1px dashed #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f9fafb',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            marginBottom: '8px',
            color: '#111827'
          }}>暂无历史记录</h3>
          <p style={{ marginBottom: '24px' }}>您还没有创作记录，快去生成一些精彩的图片吧！</p>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onClick={() => navigate("/generate")}
            type="button"
          >
            开始创作
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                backgroundColor: '#f9fafb'
              }}>
                <img
                  src={item.url}
                  alt={item.prompt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x450?text=图片加载失败";
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 12px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: '6px'
                }}>
                  {item.tag}
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.prompt}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  {formatTime(item.createdAt)}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#3b82f6',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onClick={() => downloadImage(item.url, item.id)}
                    type="button"
                  >
                    📥 下载
                  </button>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#4f46e5',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onClick={() => {
                      setPendingPrompt(item.prompt);
                      navigate("/generate");
                    }}
                    type="button"
                  >
                    🔄 再次生成
                  </button>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onClick={() => handleDelete(item.id)}
                    type="button"
                  >
                    🗑️ 删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;