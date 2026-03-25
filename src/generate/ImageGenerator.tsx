import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ImageGenerator.css";
import {
  appendHistoryItems,
  consumePendingPrompt,
  type HistoryItem,
} from "../pages/History/storage";

const ImageGenerator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"standard" | "advanced">(
    "standard",
  );
  const [googleSearchEnabled, setGoogleSearchEnabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageQuality, setImageQuality] = useState("normal");
  const [imageCount, setImageCount] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState("卡通");
  const [selectedModel, setSelectedModel] = useState("zhiqian");
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">(
    "1:1",
  );
  const [imageResolution, setImageResolution] = useState<"1K" | "2K" | "4K">(
    "1K",
  );
  const [outputFormat, setOutputFormat] = useState<"PNG" | "JPG" | "WebP">(
    "WebP",
  );
  const AI_API_URL = "https://yunwu.ai/v1/chat/completions";
  const AI_API_KEY = "sk-k6tKj1itv4jZaRnPF6KJsYtXWJSxsGCAWiNeq7u3KE4nc9yw";
  // === 新增：大语言模型优化提示词 状态 ===
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]); // 新增：存放图片
  const [isGenerating, setIsGenerating] = useState(false); // 新增：加载状态

  useEffect(() => {
    const pendingPrompt = consumePendingPrompt();
    if (pendingPrompt && pendingPrompt.prompt.trim()) {
      setPrompt(pendingPrompt.prompt);
      setNegativePrompt(pendingPrompt.negativePrompt ?? "");
    }
  }, []);

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

  const buildAugmentedPrompt = (): string => {
    const basePrompt = prompt.trim();
    if (!basePrompt) return "";
    // 如果历史/模板复用时 prompt 已经是“带参数的增强版”，避免重复拼接
    const alreadyAugmented =
      basePrompt.includes("风格：") &&
      basePrompt.includes("模型：") &&
      basePrompt.includes("宽高比：") &&
      basePrompt.includes("分辨率：");
    if (alreadyAugmented) return basePrompt;
    // 把界面选项写进提示词，确保“再次生成/历史复用”也能带上这些参数
    return [
      basePrompt,
      `风格：${selectedStyle}`,
      `模型：${selectedModel}`,
      `宽高比：${aspectRatio}`,
      `分辨率：${imageResolution}`,
      `输出格式：${outputFormat}`,
      `质量：${imageQuality}`,
    ].join("，");
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () =>
        reject(new Error("图片加载失败，请检查生成结果或网络"));
      img.src = src;
    });
  };

  const applyWatermarkAndConvert = async (
    srcDataUrl: string,
  ): Promise<string> => {
    const img = await loadImage(srcDataUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context 不可用");

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 透明水印：底部右侧
    const text = "智千";
    const paddingX = Math.max(16, Math.floor(canvas.width * 0.03));
    const paddingY = Math.max(12, Math.floor(canvas.height * 0.03));
    const fontSize = Math.max(18, Math.floor(canvas.width / 10));

    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = Math.max(2, Math.floor(fontSize * 0.08));

    const x = canvas.width - paddingX;
    const y = canvas.height - paddingY;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.restore();

    const quality = 0.92;
    if (outputFormat === "JPG") {
      return canvas.toDataURL("image/jpeg", quality);
    }
    if (outputFormat === "WebP") {
      return canvas.toDataURL("image/webp", quality);
    }
    return canvas.toDataURL("image/png");
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
      const augmentedPrompt = buildAugmentedPrompt();
      if (!augmentedPrompt) {
        alert("提示词为空，无法生成");
        return;
      }
      const response = await fetch("https://yunwu.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "doubao-seedream-4-0-250828",
          prompt: augmentedPrompt,
          negative_prompt: negativePrompt,
          quality: imageQuality,
          n: imageCount,
          response_format: "b64_json", // 明确告诉接口返回 base64
          // 移除size参数，使用API默认尺寸，避免API不支持的尺寸值导致失败
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

      // 简化处理，直接使用原始图片URL，避免水印处理可能导致的问题
      console.log("图片生成成功，获取到的图片数量：", imageUrls.length);
      setGeneratedImages(imageUrls);
      console.log("已更新generatedImages状态");
      const now = new Date();
      const nextHistoryItems: HistoryItem[] = imageUrls.map(
        (url, index) => ({
          id: `${now.getTime()}-${index}`,
          url,
          prompt: augmentedPrompt,
          createdAt: now.toISOString(),
          tag: activeTab === "advanced" ? "高级生成" : "标准生成",
        }),
      );
      appendHistoryItems(nextHistoryItems);
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
          <select
            className="form-select"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            <option value="卡通">卡通</option>
            <option value="写实">写实</option>
            <option value="艺术">艺术</option>
            <option value="其他">其他</option>
          </select>
        </div>

        {/* 模型选择 */}
        <div className="form-group">
          <label className="form-label">模型</label>
          <select
            className="form-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="zhiqian">zhiqian</option>
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
            <select
              className="form-select"
              value={aspectRatio}
              onChange={(e) =>
                setAspectRatio(e.target.value as "1:1" | "16:9" | "9:16")
              }
            >
              <option value="1:1">1:1 (正方形)</option>
              <option value="16:9">16:9 (横版)</option>
              <option value="9:16">9:16 (竖版)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">分辨率</label>
            <select
              className="form-select"
              value={imageResolution}
              onChange={(e) =>
                setImageResolution(e.target.value as "1K" | "2K" | "4K")
              }
            >
              <option value="1K">1K</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">格式</label>
            <select
              className="form-select"
              value={outputFormat}
              onChange={(e) =>
                setOutputFormat(e.target.value as "PNG" | "JPG" | "WebP")
              }
            >
              <option value="PNG">PNG</option>
              <option value="JPG">JPG</option>
              <option value="WebP">WebP</option>
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
          <button className="generate-button" onClick={handleGenerate} disabled={isGenerating}>
            <span className="icon">👤</span>生成图片
          </button>
          <button
            className="generate-button"
            style={{ marginLeft: 10, background: "#fff", color: "#111", border: "1px solid #ddd" }}
            onClick={() => navigate("/history")}
            type="button"
          >
            查看历史
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
          style={{ padding: "10px", minHeight: 500 }}
        >
          {isGenerating ? (
            <div className="loading-text">🎨 正在生成图片...</div>
          ) : generatedImages.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                height: "100%"
              }}
            >
              {generatedImages.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  style={{
                    flex: "1 1 calc(50% - 4px)",
                    minWidth: "200px",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{ 
                      width: "100%", 
                      height: "auto",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: 8 
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/800x600?text=图片加载失败";
                    }}
                  />
                </div>
              ))}
            </div>
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
