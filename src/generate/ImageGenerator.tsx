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
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  type PromptCategory = "场景" | "物品" | "人物" | "服饰" | "环境";
  type SceneSubCat = "室外" | "室内";
  type ItemSubCat =
    | "家具家居"
    | "家用电器"
    | "数码配件"
    | "洗漱清洁"
    | "日常用品";

  const [activeCat, setActiveCat] = useState<PromptCategory>("场景");
  const [sceneSubCat, setSceneSubCat] = useState<SceneSubCat>("室外");
  const [itemSubCat, setItemSubCat] = useState<ItemSubCat>("家具家居");

  useEffect(() => {
    const pendingPrompt = consumePendingPrompt();
    if (pendingPrompt && pendingPrompt.prompt.trim()) {
      setPrompt(pendingPrompt.prompt);
      setNegativePrompt(pendingPrompt.negativePrompt ?? "");
    }
  }, []);

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
          model: "gpt-4o-mini",
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
    const alreadyAugmented =
      basePrompt.includes("风格：") &&
      basePrompt.includes("模型：") &&
      basePrompt.includes("宽高比：") &&
      basePrompt.includes("分辨率：");
    if (alreadyAugmented) return basePrompt;
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
          response_format: "b64_json",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("接口错误：", errorData);
        throw new Error(`请求失败，状态码：${response.status}`);
      }

      const data = await response.json();
      const imageUrls: string[] = [];

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((item: any) => {
          if (item.b64_json) {
            const base64Url = `data:image/png;base64,${item.b64_json}`;
            imageUrls.push(base64Url);
          } else if (item.url) {
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
      const now = new Date();
      const nextHistoryItems: HistoryItem[] = imageUrls.map((url, index) => ({
        id: `${now.getTime()}-${index}`,
        url,
        prompt: augmentedPrompt,
        createdAt: now.toISOString(),
        tag: activeTab === "advanced" ? "高级生成" : "标准生成",
      }));
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

  const promptData = {
    场景: {
      室外: [
        "城堡",
        "城市",
        "水上乐园",
        "旋转木马",
        "摩天轮",
        "水族馆",
        "动物园",
        "保龄球馆",
        "美术馆",
        "博物馆",
      ],
      室内: [
        "天文馆",
        "游泳池",
        "体育场",
        "寺庙",
        "巴士车站",
        "火车站",
        "喷泉",
        "游乐场",
        "市场摊位",
        "电话亭",
      ],
    },
    物品: {
      家具家居: [
        "沙发",
        "桌子",
        "椅子",
        "台灯",
        "花瓶",
        "书架",
        "抱枕",
        "窗帘",
        "收纳盒",
      ],
      家用电器: ["冰箱", "电视", "电脑", "风扇", "暖手宝"],
      数码配件: ["相机", "充电宝", "数据线", "闹钟"],
      洗漱清洁: [
        "毛巾",
        "牙刷",
        "牙膏",
        "洗发水",
        "沐浴露",
        "香皂",
        "洗衣液",
        "梳子",
        "纸巾",
      ],
      日常用品: [
        "水杯",
        "雨伞",
        "拖鞋",
        "衣架",
        "饭盒",
        "筷子",
        "口罩",
        "剪刀",
        "胶带",
        "笔记本",
        "签字笔",
      ],
    },
    人物: [
      "少女",
      "少年",
      "古风男子",
      "古风女子",
      "御姐",
      "萝莉",
      "正太",
      "大叔",
      "老奶奶",
      "老爷爷",
    ],
    服饰: [
      "汉服",
      "JK制服",
      "洛丽塔",
      "西装",
      "运动服",
      "旗袍",
      "和服",
      "婚纱",
      "卫衣",
      "牛仔裤",
    ],
    环境: [
      "森林",
      "海边",
      "雪山",
      "沙漠",
      "星空",
      "雨夜",
      "黄昏",
      "清晨",
      "雾天",
      "雪天",
    ],
  } as const;

  const insertPresetPrompt = (text: string) => {
    setPrompt((prev) => (prev ? `${prev}，${text}` : text));
  };

  return (
    <div className="generator-container">
      <div className="generator-left">
        <h1 className="generator-title">图片生成器</h1>

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

        <div className="form-group">
          <label className="form-label">
            提示词
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

        <div className="form-group preset-prompt-group">
          <label className="form-label">预设提示词</label>

          <div className="preset-categories">
            {(["场景", "物品", "人物", "服饰", "环境"] as const).map((cat) => (
              <button
                key={cat}
                className={`preset-category-btn ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCat === "场景" && (
            <div className="preset-subcategories">
              {(["室外", "室内"] as const).map((sub) => (
                <button
                  key={sub}
                  className={`preset-subcategory-btn ${sceneSubCat === sub ? "active" : ""}`}
                  onClick={() => setSceneSubCat(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {activeCat === "物品" && (
            <div className="preset-subcategories">
              {(
                [
                  "家具家居",
                  "家用电器",
                  "数码配件",
                  "洗漱清洁",
                  "日常用品",
                ] as const
              ).map((sub) => (
                <button
                  key={sub}
                  className={`preset-subcategory-btn ${itemSubCat === sub ? "active" : ""}`}
                  onClick={() => setItemSubCat(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          <div className="preset-tags">
            {activeCat === "场景"
              ? promptData.场景[sceneSubCat].map((tag) => (
                  <button
                    key={tag}
                    className="preset-tag"
                    onClick={() => insertPresetPrompt(tag)}
                  >
                    {tag}
                  </button>
                ))
              : activeCat === "物品"
                ? promptData.物品[itemSubCat].map((tag) => (
                    <button
                      key={tag}
                      className="preset-tag"
                      onClick={() => insertPresetPrompt(tag)}
                    >
                      {tag}
                    </button>
                  ))
                : promptData[activeCat].map((tag) => (
                    <button
                      key={tag}
                      className="preset-tag"
                      onClick={() => insertPresetPrompt(tag)}
                    >
                      {tag}
                    </button>
                  ))}
          </div>
        </div>

        <div className="cost-section">
          <p className="cost-text">
            消耗 {activeTab === "standard" ? 5 : 10} 积分
          </p>
          <button
            className="generate-button"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <span className="icon">👤</span>生成图片
          </button>
          <button
            className="generate-button"
            style={{
              marginLeft: 10,
              background: "#fff",
              color: "#111",
              border: "1px solid #ddd",
            }}
            onClick={() => navigate("/history")}
            type="button"
          >
            查看历史
          </button>
        </div>
      </div>

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
                height: "100%",
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
                    alignItems: "center",
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: 8,
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
