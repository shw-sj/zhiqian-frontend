import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  isError?: boolean;
}

interface HistoryEntry {
  id: string;
  createdAt: string;
  title: string;
  messages: Message[];
}

const STORAGE_KEY = 'chat_history';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState<HistoryEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as HistoryEntry[];
      if (Array.isArray(parsed)) {
        setHistoryList(parsed);
        if (parsed.length > 0) {
          setSelectedId(parsed[0].id);
        }
      }
    } catch {
      // ignore parse error
    }
  }, []);

  const selectedEntry = useMemo(
    () => historyList.find((item) => item.id === selectedId) || null,
    [historyList, selectedId]
  );

  const handleClearAll = () => {
    if (!historyList.length) return;
    if (!window.confirm('确定要清空全部历史记录吗？此操作不可恢复。')) return;
    localStorage.removeItem(STORAGE_KEY);
    setHistoryList([]);
    setSelectedId(null);
  };

  const handleBackToGenerate = () => {
    navigate('/generate');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 340px) minmax(0, 1fr)',
        gap: 24,
        alignItems: 'stretch',
      }}
    >
      {/* 左侧：历史列表 */}
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 420,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#111827',
                margin: 0,
              }}
            >
              创作历史
            </h2>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 13,
                color: '#6b7280',
              }}
            >
              查看你与 AI 的过往对话
            </p>
          </div>
          <button
            onClick={handleBackToGenerate}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              background: '#fff',
              fontSize: 13,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            返回创作
          </button>
        </div>

        {historyList.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px 12px',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                background:
                  'radial-gradient(circle at 30% 20%, rgba(129, 140, 248, 0.35), transparent 60%), radial-gradient(circle at 70% 80%, rgba(244, 114, 182, 0.3), transparent 55%)',
                marginBottom: 16,
              }}
            />
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: '#111827',
                margin: '0 0 4px',
              }}
            >
              还没有任何历史记录
            </p>
            <p
              style={{
                fontSize: 13,
                color: '#6b7280',
                margin: 0,
              }}
            >
              在生成页与 AI 对话，并在清空对话时会自动保存本次创作历史。
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '4px 0 12px',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: '#9ca3af',
                }}
              >
                共 {historyList.length} 条记录
              </span>
              <button
                onClick={handleClearAll}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: 'none',
                  background: 'rgba(239, 68, 68, 0.06)',
                  color: '#b91c1c',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                清空全部
              </button>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: 4,
              }}
            >
              {historyList.map((item) => {
                const createdLabel = new Date(item.createdAt).toLocaleString();
                const isActive = item.id === selectedId;
                const firstUserMessage = item.messages.find(
                  (m) => m.role === 'user'
                );
                const preview =
                  firstUserMessage?.content.slice(0, 40).trim() ||
                  '无标题对话';

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      borderRadius: 16,
                      border: isActive
                        ? '1px solid rgba(79, 70, 229, 0.6)'
                        : '1px solid rgba(0, 0, 0, 0.04)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.06), rgba(129, 140, 248, 0.06))'
                        : '#fff',
                      padding: '10px 12px',
                      marginBottom: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#111827',
                        }}
                      >
                        {preview}
                        {firstUserMessage &&
                          firstUserMessage.content.length > 40 &&
                          '…'}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: '#9ca3af',
                        }}
                      >
                        {createdLabel}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: '#9ca3af',
                        }}
                      >
                        {item.messages.length} 条对话
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 右侧：对话详情 */}
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          padding: 20,
          minHeight: 420,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!selectedEntry ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#6b7280',
              fontSize: 14,
            }}
          >
            选择左侧的一条记录即可在这里查看完整对话内容。
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#111827',
                    margin: 0,
                  }}
                >
                  历史对话详情
                </h3>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 12,
                    color: '#9ca3af',
                  }}
                >
                  创建时间：{new Date(selectedEntry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 18,
                border: '1px solid rgba(0, 0, 0, 0.03)',
                background:
                  'radial-gradient(circle at top, rgba(129, 140, 248, 0.06), transparent 55%)',
                padding: 16,
                overflowY: 'auto',
              }}
            >
              {selectedEntry.messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background:
                        msg.role === 'user'
                          ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                          : 'linear-gradient(135deg, #f97316, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    {msg.role === 'user' ? '我' : 'AI'}
                  </div>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '8px 12px',
                      borderRadius: 18,
                      background:
                        msg.role === 'user'
                          ? '#111827'
                          : 'rgba(255, 255, 255, 0.9)',
                      color: msg.role === 'user' ? '#f9fafb' : '#111827',
                      fontSize: 14,
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      border:
                        msg.role === 'assistant'
                          ? '1px solid rgba(148, 163, 184, 0.4)'
                          : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

