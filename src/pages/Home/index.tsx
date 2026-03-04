import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 72px)' }}>
      {/* 背景网格装饰 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* 背景装饰元素 - 渐变光晕 */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-300px',
          left: '-300px',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
          animation: 'pulse 10s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          zIndex: 0,
          animation: 'pulse 12s ease-in-out infinite',
        }}
      />

      {/* 浮动装饰点 */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            background: i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(59, 130, 246, 0.4)',
            borderRadius: '50%',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 12}%`,
            filter: 'blur(1px)',
            zIndex: 0,
            animation: `float ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* 主要内容 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <div
          style={{
            textAlign: 'center',
            padding: '120px 0 80px',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* 标题 */}
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: 24,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            欢迎来到
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              智创千面
            </span>
          </h1>

          {/* 副标题 */}
          <p
            style={{
              fontSize: 20,
              color: '#666',
              lineHeight: 1.7,
              marginBottom: 48,
              maxWidth: 640,
              margin: '0 auto 48px',
            }}
          >
            用AI的力量，将你的创意转化为千变万化的视觉作品
            <br />
            探索无限可能，创造属于你的独特风格
          </p>

          {/* CTA按钮 */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(isLoggedIn ? '/generate' : '/login')}
              style={{
                padding: '18px 36px',
                background: '#1a1a1a',
                color: '#fff',
                border: 'none',
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
              }}
            >
              开始创作
            </button>
            <button
              onClick={() => navigate('/templates')}
              style={{
                padding: '18px 36px',
                background: '#fff',
                color: '#1a1a1a',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fafafa';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              浏览模板
            </button>
          </div>
        </div>

        {/* 功能特性卡片 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
            marginTop: 120,
            padding: '0 24px',
          }}
        >
          {/* 卡片1：AI生成 */}
          <div
            style={{
              padding: '40px 32px',
              background: '#fff',
              borderRadius: 24,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28,
              }}
            >
              ✨
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 12,
              }}
            >
              AI智能生成
            </h3>
            <p
              style={{
                fontSize: 15,
                color: '#666',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              只需输入你的想法，AI就能为你创造出独特的图像作品，支持多种风格和主题
            </p>
          </div>

          {/* 卡片2：模板市场 */}
          <div
            style={{
              padding: '40px 32px',
              background: '#fff',
              borderRadius: 24,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28,
              }}
            >
              🎨
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 12,
              }}
            >
              丰富模板
            </h3>
            <p
              style={{
                fontSize: 15,
                color: '#666',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              浏览海量精美模板，从插画到照片，从抽象到写实，总有一款适合你
            </p>
          </div>

          {/* 卡片3：创作历史 */}
          <div
            onClick={() => navigate('/history')}
            style={{
              padding: '40px 32px',
              background: '#fff',
              borderRadius: 24,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28,
              }}
            >
              📚
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 12,
              }}
            >
              创作历史
            </h3>
            <p
              style={{
                fontSize: 15,
                color: '#666',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              保存你的每一次创作，随时回顾和管理你的作品集，见证创意的成长
            </p>
          </div>
        </div>

        {/* 底部装饰文字 */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 120,
            paddingBottom: 80,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: '#999',
              margin: 0,
            }}
          >
            让AI成为你创意的无限延伸
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
