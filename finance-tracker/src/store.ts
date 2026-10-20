import type { Category, Kind, State, Transaction } from "./types";
import { uid } from "./utils";

const STORAGE_KEY = "finance-tracker:v1";

export const PALETTE = [
  "#0f766e", "#2563eb", "#d97706", "#dc2626", "#7c3aed",
  "#db2777", "#059669", "#0891b2", "#65a30d", "#ea580c", "#64748b",
];

const DEFAULT_CATEGORIES: [string, Kind][] = [
  ["Продукты", "expense"],
  ["Кафе и рестораны", "expense"],
  ["Транспорт", "expense"],
  ["Жильё и коммуналка", "expense"],
  ["Связь и интернет", "expense"],
  ["Здоровье", "expense"],
  ["Одежда", "expense"],
  ["Развлечения", "expense"],
  ["Подписки", "expense"],
  ["Другое", "expense"],
  ["Зарплата", "income"],
  ["Фриланс", "income"],
  ["Подарки", "income"],
  ["Другое", "income"],
];

export function defaultState(): State {
  return {
    version: 1,
    currency: "₸",
    categories: DEFAULT_CATEGORIES.map(([name, kind], i) => ({
      id: uid(),
      name,
      kind,
      color: PALETTE[i % PALETTE.length],
    })),
    transactions: [],
    budgets: {},
  };
}

const isKind = (v: unknown): v is Kind => v === "income" || v === "expense";
const isDate = (v: unknown): v is string => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

/** Проверяет структуру данных (из localStorage или импортированного файла). */
export function parseState(raw: unknown): State | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Partial<State>;
  if (s.version !== 1 || !Array.isArray(s.categories) || !Array.isArray(s.transactions)) return null;

  const categories = s.categories.filter(
    (c): c is Category =>
      !!c && typeof c.id === "string" && typeof c.name === "string" && isKind(c.kind) && typeof c.color === "string",
  );
  const ids = new Set(categories.map((c) => c.id));
  const transactions = s.transactions.filter(
    (t): t is Transaction =>
      !!t &&
      typeof t.id === "string" &&
      isKind(t.kind) &&
      typeof t.amount === "number" &&
      Number.isFinite(t.amount) &&
      t.amount > 0 &&
      ids.has(t.categoryId) &&
      isDate(t.date),
  ).map((t) => ({ ...t, note: typeof t.note === "string" ? t.note : "", createdAt: Number(t.createdAt) || 0 }));

  const budgets: Record<string, number> = {};
  if (s.budgets && typeof s.budgets === "object") {
    for (const [id, limit] of Object.entries(s.budgets)) {
      if (ids.has(id) && typeof limit === "number" && limit > 0) budgets[id] = limit;
    }
  }

  return {
    version: 1,
    currency: typeof s.currency === "string" && s.currency.trim() ? s.currency : "₸",
    categories,
    transactions,
    budgets,
  };
}

export function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return parseState(JSON.parse(raw)) ?? defaultState();
  } catch {
    // повреждённые данные или недоступное хранилище — начинаем с чистого листа
  }
  return defaultState();
}

export function saveState(state: State) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // хранилище недоступно (приватный режим и т.п.) — данные останутся только в памяти
  }
}

export type Action =
  | { type: "saveTx"; tx: Transaction }
  | { type: "deleteTx"; id: string }
  | { type: "saveCategory"; category: Category }
  | { type: "deleteCategory"; id: string }
  | { type: "setBudget"; categoryId: string; limit: number | null }
  | { type: "setCurrency"; currency: string }
  | { type: "replace"; state: State };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "saveTx": {
      const exists = state.transactions.some((t) => t.id === action.tx.id);
      return {
        ...state,
        transactions: exists
          ? state.transactions.map((t) => (t.id === action.tx.id ? action.tx : t))
          : [...state.transactions, action.tx],
      };
    }
    case "deleteTx":
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.id) };
    case "saveCategory": {
      const exists = state.categories.some((c) => c.id === action.category.id);
      return {
        ...state,
        categories: exists
          ? state.categories.map((c) => (c.id === action.category.id ? action.category : c))
          : [...state.categories, action.category],
      };
    }
    case "deleteCategory": {
      // Удалять можно только неиспользуемую категорию — это проверяет интерфейс.
      const budgets = { ...state.budgets };
      delete budgets[action.id];
      return { ...state, categories: state.categories.filter((c) => c.id !== action.id), budgets };
    }
    case "setBudget": {
      const budgets = { ...state.budgets };
      if (action.limit && action.limit > 0) budgets[action.categoryId] = action.limit;
      else delete budgets[action.categoryId];
      return { ...state, budgets };
    }
    case "setCurrency":
      return { ...state, currency: action.currency };
    case "replace":
      return action.state;
  }
}
