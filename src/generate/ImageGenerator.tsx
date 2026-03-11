import { useState } from 'react';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'advanced'>('standard');
  const [googleSearchEnabled, setGoogleSearchEnabled] = useState(true);
  const [prompt, setPrompt] = useState('');
  // 新增高级模式专属状态
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageQuality, setImageQuality] = useState('normal');
  const [imageCount, setImageCount] = useState(1);

  return (
    <div className="generator-container">
      {/* 左侧：生成器配置区 */}
      <div className="generator-left">
        <h1 className="generator-title">图片生成器</h1>

        {/* 标签栏 */}
        <div className="tab-bar">
          <button
            className={`tab-button ${activeTab === 'standard' ? 'active' : ''}`}
            onClick={() => setActiveTab('standard')}
          >
            标准
          </button>
          <button
            className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            高级 <span className="new-badge">NEW</span>
          </button>
        </div>

        {/* 共享配置项 - 两个标签页都显示 */}
        {/* 风格选择 */}
        <div className="form-group">
          <label className="form-label">风格</label>
          <select className="form-select">
            <option>卡通</option>
            <option>写实</option>
            <option>艺术</option>
            <option>其他</option>
          </select>
        </div>

        {/* 模型选择 */}
        <div className="form-group">
          <label className="form-label">模型</label>
          <select className="form-select">
            <option>暂无</option>
            <option>暂无</option>
          </select>
        </div>

        {/* Google 搜索开关 */}
        <div className="form-group toggle-group">
          <div>
            <label className="form-label">联网搜索</label>
            <p className="form-desc">使用实时网络信息生成更准确的图片</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={googleSearchEnabled}
              onChange={() => setGoogleSearchEnabled(!googleSearchEnabled)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* 图片参数行 */}
        <div className="params-row">
          <div className="form-group">
            <label className="form-label">宽高比</label>
            <select className="form-select">
              <option>1:1 (正方形)</option>
              <option>16:9 (横版)</option>
              <option>9:16 (竖版)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">分辨率</label>
            <select className="form-select">
              <option>1K</option>
              <option>2K</option>
              <option>4K</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">格式</label>
            <select className="form-select">
              <option>PNG</option>
              <option>JPG</option>
              <option>WebP</option>
            </select>
          </div>
        </div>

        {/* 高级标签页专属配置项 - 仅在高级模式显示 */}
        {activeTab === 'advanced' && (
          <div className="advanced-options">
            <div className="form-group">
              <label className="form-label">图片质量</label>
              <select 
                className="form-select" 
                value={imageQuality}
                onChange={(e) => setImageQuality(e.target.value)}
              >
                <option value="normal">普通</option>
                <option value="high">高清</option>
                <option value="ultra">超高清</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">生成数量</label>
              <select 
                className="form-select" 
                value={imageCount}
                onChange={(e) => setImageCount(Number(e.target.value))}
              >
                <option value={1}>1张</option>
                <option value={2}>2张</option>
                <option value={4}>4张</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">负面提示词</label>
              <textarea
                className="prompt-input"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="例如：模糊、低分辨率、水印"
                maxLength={5000}
              />
              <div className="char-count">{negativePrompt.length} / 5000</div>
            </div>
          </div>
        )}

        {/* 提示词输入 */}
        <div className="form-group">
          <label className="form-label">提示词</label>
          <textarea
            className="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：生成一个关于洗发水的广告"
            maxLength={15000}
          />
          <div className="char-count">{prompt.length} / 15000</div>
        </div>

        {/* 消耗与生成按钮 */}
        <div className="cost-section">
          {/* 高级模式消耗更多积分 */}
          <p className="cost-text">消耗 {activeTab === 'standard' ? 5 : 10} 积分</p>
          <button className="generate-button">
            <span className="icon">👤</span> 登录生成图片
          </button>
        </div>
      </div>

      {/* 右侧：预览区 */}
      <div className="generator-right">
        <div className="preview-header">
          <span className="preview-icon">🖼</span>
          <h2 className="preview-title">图片预览</h2>
        </div>
        <div className="preview-box">
          <div className="preview-placeholder">
            <span className="placeholder-icon">🖼</span>
            <p className="placeholder-text">没有生成图片</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;