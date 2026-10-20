import { useEffect, useMemo, useReducer, useState } from "react";
import { loadState, reducer, saveState } from "./store";
import type { Period, Transaction } from "./types";
import { currentMonth, inPeriod } from "./utils";
import PeriodPicker from "./components/PeriodPicker";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Stats from "./components/Stats";
import Budgets from "./components/Budgets";
import Settings from "./components/Settings";

type Tab = "ops" | "stats" | "budgets" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "ops", label: "Операции" },
  { id: "stats", label: "Статистика" },
  { id: "budgets", label: "Бюджеты" },
  { id: "settings", label: "Настройки" },
];

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const [tab, setTab] = useState<Tab>("ops");
  const [period, setPeriod] = useState<Period>(currentMonth);
  // null — форма закрыта, "new" — новая операция, объект — редактирование
  const [editing, setEditing] = useState<Transaction | "new" | null>(null);

  useEffect(() => saveState(state), [state]);

  const periodTxs = useMemo(
    () => state.transactions.filter((tx) => inPeriod(tx, period)),
    [state.transactions, period],
  );

  return (
    <div className="app">
      <header className="topbar">
        <h1>Мои финансы</h1>
        <PeriodPicker period={period} onChange={setPeriod} />
      </header>

      <Summary state={state} periodTxs={periodTxs} period={period} />

      <nav className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "tab active" : "tab"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === "ops" && <TransactionList state={state} txs={periodTxs} onEdit={setEditing} />}
        {tab === "stats" && <Stats state={state} periodTxs={periodTxs} period={period} />}
        {tab === "budgets" && <Budgets state={state} period={period} dispatch={dispatch} />}
        {tab === "settings" && <Settings state={state} dispatch={dispatch} />}
      </main>

      <button className="fab" aria-label="Добавить операцию" onClick={() => setEditing("new")}>
        +
      </button>

      {editing && (
        <TransactionForm
          state={state}
          initial={editing === "new" ? null : editing}
          defaultDate={period}
          dispatch={dispatch}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
