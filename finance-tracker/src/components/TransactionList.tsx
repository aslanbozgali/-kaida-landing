import { useMemo, useState } from "react";
import type { Kind, State, Transaction } from "../types";
import { dayLabel, formatMoney } from "../utils";

interface Props {
  state: State;
  txs: Transaction[];
  onEdit: (tx: Transaction) => void;
}

export default function TransactionList({ state, txs, onEdit }: Props) {
  const [kind, setKind] = useState<Kind | "all">("all");
  const [categoryId, setCategoryId] = useState("");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => new Map(state.categories.map((c) => [c.id, c])), [state.categories]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = txs
      .filter((tx) => kind === "all" || tx.kind === kind)
      .filter((tx) => !categoryId || tx.categoryId === categoryId)
      .filter(
        (tx) =>
          !q ||
          tx.note.toLowerCase().includes(q) ||
          (categories.get(tx.categoryId)?.name.toLowerCase().includes(q) ?? false),
      )
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);

    const byDate = new Map<string, Transaction[]>();
    for (const tx of filtered) {
      const list = byDate.get(tx.date);
      if (list) list.push(tx);
      else byDate.set(tx.date, [tx]);
    }
    return [...byDate.entries()];
  }, [txs, kind, categoryId, query, categories]);

  const selectableCategories = state.categories.filter((c) => kind === "all" || c.kind === kind);
  const c = state.currency;

  return (
    <section>
      <div className="filters">
        <div className="segmented">
          {(["all", "expense", "income"] as const).map((k) => (
            <button
              key={k}
              className={kind === k ? "active" : undefined}
              onClick={() => {
                setKind(k);
                setCategoryId("");
              }}
            >
              {k === "all" ? "Все" : k === "expense" ? "Расходы" : "Доходы"}
            </button>
          ))}
        </div>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} aria-label="Категория">
          <option value="">Все категории</option>
          {selectableCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
              {kind === "all" ? (cat.kind === "income" ? " (доход)" : " (расход)") : ""}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Поиск по комментарию или категории"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {groups.length === 0 ? (
        <p className="empty">
          {txs.length === 0 ? "Операций за этот период пока нет. Нажми «+», чтобы добавить первую." : "Ничего не найдено."}
        </p>
      ) : (
        groups.map(([date, list]) => {
          const daySum = list.reduce((acc, tx) => acc + (tx.kind === "income" ? tx.amount : -tx.amount), 0);
          return (
            <div key={date} className="day">
              <div className="day-head">
                <span>{dayLabel(date)}</span>
                <span className={daySum < 0 ? "neg" : "pos"}>
                  {daySum > 0 ? "+" : ""}
                  {formatMoney(daySum, c)}
                </span>
              </div>
              <ul className="tx-list">
                {list.map((tx) => {
                  const cat = categories.get(tx.categoryId);
                  return (
                    <li key={tx.id}>
                      <button className="tx" onClick={() => onEdit(tx)}>
                        <span className="dot" style={{ background: cat?.color }} />
                        <span className="tx-main">
                          <span className="tx-cat">{cat?.name ?? "Без категории"}</span>
                          {tx.note && <span className="tx-note">{tx.note}</span>}
                        </span>
                        <span className={tx.kind === "income" ? "tx-amount pos" : "tx-amount"}>
                          {tx.kind === "income" ? "+" : "−"}
                          {formatMoney(tx.amount, c)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}
    </section>
  );
}
