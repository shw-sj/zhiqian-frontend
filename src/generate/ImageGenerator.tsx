import { useState } from "react";
import "./ImageGenerator.css";

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState<"standard" | "advanced">(
    "standard",
  );
  const [googleSearchEnabled, setGoogleSearchEnabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageQuality, setImageQuality] = useState("normal");
  const [imageCount, setImageCount] = useState(1);
  const AI_API_URL = "https://yunwu.ai/v1/chat/completions";
  const AI_API_KEY = "sk-4lvPRvwk46HunooWIsgtSWCvGJtR0gJlbCITlOhHT10fuCSm";
  // === 新增：大语言模型优化提示词 状态 ===
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]); // 新增：存放图片
  const [isGenerating, setIsGenerating] = useState(false); // 新增：加载状态

  // === 新增：AI 优化提示词核心函数 ===
  const optimizePromptByLLM = async () => {
    if (!prompt.trim()) {
      alert("请先输入需要优化的提示词！");
      return;
    }
    setIsOptimizing(true);
    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5.4-mini",
          messages: [
            {
              role: "system",
              content:
                "你是专业提示词优化师，擅长把普通文本优化成专业、清晰、可直接用于大模型生成图片的高质量提示词。只返回优化后的结果，不要多余解释。",
            },
            {
              role: "user",
              content: `请优化以下提示词：${prompt}`,
            },
          ],
        }),
      });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const html = await response.text();
        throw new Error(
          `接口返回非JSON，可能是参数错误/认证失败：${html.slice(0, 50)}`,
        );
      }
      if (!response.ok) {
        throw new Error("AI 接口请求失败");
      }

      const data = await response.json();
      const optimizedPrompt = data.choices[0].message.content.trim();

      // 回填到输入框
      setPrompt(optimizedPrompt);
      alert("✅ 提示词已由 AI 优化完成！");
    } catch (err) {
      console.error("优化出错：", err);
      const errorMessage =
        err instanceof Error ? err.message : "未知错误，请检查网络或API配置";
      alert(`❌ 优化失败：\n${errorMessage}`);
    } finally {
      setIsOptimizing(false);
    }
  };

  // 生成图片（保留原有逻辑）

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("请输入提示词！");
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const response = await fetch("https://yunwu.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1.5",
          prompt: prompt,
          negative_prompt: negativePrompt,
          quality: imageQuality,
          n: imageCount,
          response_format: "b64_json", // 明确告诉接口返回 base64
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("接口错误：", errorData);
        throw new Error(`请求失败，状态码：${response.status}`);
      }

      const data = await response.json();
      console.log("✅ AI 返回完整数据：", data);

      const imageUrls: string[] = [];

      // --------------------------
      // 核心修改：读取 b64_json
      // --------------------------
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((item: any) => {
          // 1. 优先取 base64
          if (item.b64_json) {
            // 拼接成可直接渲染的图片格式
            const base64Url = `data:image/png;base64,${item.b64_json}`;
            imageUrls.push(base64Url);
          }
          // 2. 兼容备用 url
          else if (item.url) {
            imageUrls.push(item.url);
          }
        });
      } else {
        throw new Error("未返回有效图片数据，请查看控制台输出");
      }

      if (imageUrls.length === 0) {
        throw new Error("图片生成成功，但未获取到图片");
      }

      setGeneratedImages(imageUrls);
      alert("✅ 图片生成成功！");
    } catch (err) {
      console.error("生成失败：", err);
      const msg = err instanceof Error ? err.message : "未知错误";
      alert(`❌ 失败：${msg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-left">
        <h1 className="generator-title">图片生成器</h1>

        {/* 标签栏 */}
        <div className="tab-bar">
          <button
            className={`tab-button ${activeTab === "standard" ? "active" : ""}`}
            onClick={() => setActiveTab("standard")}
          >
            标准
          </button>
          <button
            className={`tab-button ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => setActiveTab("advanced")}
          >
            高级 <span className="new-badge">NEW</span>
          </button>
        </div>

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

        {/* 高级选项 */}
        {activeTab === "advanced" && (
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
              <div className="char-count">
                {(negativePrompt || "").length} / 5000
              </div>
            </div>
          </div>
        )}

        {/* 提示词输入 + AI 优化按钮 */}
        <div className="form-group">
          <label className="form-label">
            提示词
            {/* === 新增：AI 优化按钮 === */}
            <button
              className={`optimize-btn ${isOptimizing ? "loading" : ""}`}
              onClick={optimizePromptByLLM}
              disabled={isOptimizing}
            >
              {isOptimizing ? "优化中..." : "🤖 AI 优化提示词"}
            </button>
          </label>
          <textarea
            className="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：生成一个关于洗发水的广告"
            maxLength={15000}
          />
          <div className="char-count">{(prompt || "").length}/ 15000</div>
        </div>

        {/* 消耗与生成 */}
        <div className="cost-section">
          <p className="cost-text">
            消耗 {activeTab === "standard" ? 5 : 10} 积分
          </p>
          <button className="generate-button" onClick={handleGenerate}>
            <span className="icon">👤</span>生成图片
          </button>
        </div>
      </div>

      {/* 右侧预览区 */}
      <div className="generator-right">
        <div className="preview-header">
          <span className="preview-icon">🖼</span>
          <h2 className="preview-title">图片预览</h2>
        </div>
        <div
          className="preview-box"
          style={{ padding: "10px", minHeight: 300 }}
        >
          {isGenerating ? (
            <div className="loading-text">🎨 正在生成图片...</div>
          ) : generatedImages.length > 0 && generatedImages[0] ? (
            <img
              src={generatedImages[0]}
              style={{ width: "100%", borderRadius: 8 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400?text=图片加载失败";
                alert("图片地址：\n" + generatedImages[0]);
              }}
            />
          ) : (
            <div className="preview-placeholder">
              <span className="placeholder-icon">🖼</span>
              <p className="placeholder-text">没有生成图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
