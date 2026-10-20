export type Kind = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  kind: Kind;
  color: string;
}

export interface Transaction {
  id: string;
  kind: Kind;
  amount: number;
  categoryId: string;
  /** Дата в формате YYYY-MM-DD */
  date: string;
  note: string;
  createdAt: number;
}

export interface State {
  version: 1;
  currency: string;
  categories: Category[];
  transactions: Transaction[];
  /** Месячный лимит по id категории расходов */
  budgets: Record<string, number>;
}

/** "YYYY-MM" или "all" */
export type Period = string;
