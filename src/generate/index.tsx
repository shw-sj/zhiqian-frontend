import { useState, useRef, useEffect } from 'react';
import './ChatWithAI.css';

// 消息类型定义
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

const HISTORY_STORAGE_KEY = 'chat_history';

const GeneratePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 生成唯一 ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const saveCurrentConversationToHistory = (conversation: Message[]) => {
    if (!conversation.length) return;
    const firstUserMessage = conversation.find((m) => m.role === 'user');
    const title =
      (firstUserMessage?.content || '').trim().slice(0, 40) || '无标题对话';

    const entry: HistoryEntry = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      title,
      messages: conversation,
    };

    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      const list: HistoryEntry[] = raw ? JSON.parse(raw) : [];
      const next = [entry, ...(Array.isArray(list) ? list : [])].slice(0, 50);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage error
    }
  };

  // 发送消息
  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isLoading) return;

    // 1. 添加用户消息
    const userMsg: Message = {
      id: generateId(),
      content: text,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // 2. 先插入加载中消息
    const loadingMsgId = generateId();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingMsgId,
        content: '正在思考...',
        role: 'assistant',
      },
    ]);

    try {
      // 模拟 AI 回复
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const reply = `你说的是：${text}\n\n我是你的 AI 助手，正在为你服务~`;

      // 3. 替换加载消息为真实回复
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMsgId
            ? { ...msg, content: reply }
            : msg
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMsgId
            ? { ...msg, content: '请求失败，请重试', isError: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    if (!messages.length) {
      setMessages([]);
      return;
    }
    // 清空前先保存到历史
    saveCurrentConversationToHistory(messages);
    setMessages([]);
  };

  // 回车发送
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI 创作对话</h2>
        <div className="chat-actions">
          <button
            className="action-button"
            onClick={handleClearConversation}
          >
            清空对话
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-message">开始和 AI 对话吧</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.role} ${msg.isError ? 'error' : ''}`}
            >
              <div className="message-avatar">
                {msg.role === 'user' ? '我' : 'AI'}
              </div>
              <div className="message-content">
                <div>{msg.content}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="输入你的想法..."
          rows={1}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  );
};

export default GeneratePage;