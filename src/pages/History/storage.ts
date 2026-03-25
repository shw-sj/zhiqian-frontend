export interface HistoryItem {
  id: string;
  url: string;
  prompt: string;
  createdAt: string;
  tag: string;
}

const HISTORY_STORAGE_KEY = "generated_image_history_v1";
const MAX_HISTORY_ITEMS = 50;
const MAX_URL_LENGTH = 200_000; // 避免 localStorage 写入超限（base64图片尤其容易超大）
const PENDING_PROMPT_STORAGE_KEY = "history_pending_prompt_v1";

export const loadHistoryItems = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is HistoryItem => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as HistoryItem).id === "string" &&
        typeof (item as HistoryItem).url === "string" &&
        typeof (item as HistoryItem).prompt === "string" &&
        typeof (item as HistoryItem).createdAt === "string" &&
        typeof (item as HistoryItem).tag === "string"
      );
    });
  } catch (error) {
    console.error("读取历史记录失败：", error);
    return [];
  }
};

export const saveHistoryItems = (items: HistoryItem[]): void => {
  try {
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(items.slice(0, MAX_HISTORY_ITEMS)),
    );
  } catch (error) {
    console.error("保存历史记录失败：", error);
  }
};

export const appendHistoryItems = (
  items: HistoryItem[],
): { stored: number; skipped: number } => {
  if (!items.length) return { stored: 0, skipped: 0 };

  // 移除大小限制，保存所有图片到历史记录中
  const current = loadHistoryItems();
  const merged = [...items, ...current];
  saveHistoryItems(merged);
  return { stored: items.length, skipped: 0 };
};

export const clearHistoryItems = (): void => {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
};

export const setPendingPrompt = (prompt: string): void => {
  try {
    localStorage.setItem(
      PENDING_PROMPT_STORAGE_KEY,
      JSON.stringify({ prompt, negativePrompt: undefined }),
    );
  } catch {
    // ignore
  }
};

export const setPendingPromptWithNegative = (
  prompt: string,
  negativePrompt?: string,
): void => {
  try {
    localStorage.setItem(
      PENDING_PROMPT_STORAGE_KEY,
      JSON.stringify({ prompt, negativePrompt: negativePrompt ?? "" }),
    );
  } catch {
    // ignore
  }
};

export const consumePendingPrompt = (): {
  prompt: string;
  negativePrompt: string;
} | null => {
  try {
    const raw = localStorage.getItem(PENDING_PROMPT_STORAGE_KEY);
    if (!raw) return null;
    localStorage.removeItem(PENDING_PROMPT_STORAGE_KEY);
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return null;
    const maybePrompt = (parsed as { prompt?: unknown }).prompt;
    const maybeNegative = (parsed as { negativePrompt?: unknown }).negativePrompt;
    if (typeof maybePrompt !== "string") return null;
    if (typeof maybeNegative !== "string") {
      return { prompt: maybePrompt, negativePrompt: "" };
    }
    return { prompt: maybePrompt, negativePrompt: maybeNegative };
  } catch {
    return null;
  }
};
