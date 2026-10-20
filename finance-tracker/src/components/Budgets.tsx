import { useMemo, useState, type Dispatch } from "react";
import type { Action } from "../store";
import type { Period, State } from "../types";
import { currentMonth, formatMoney, monthLabel, parseAmount } from "../utils";

interface Props {
  state: State;
  period: Period;
  dispatch: Dispatch<Action>;
}

export default function Budgets({ state, period, dispatch }: Props) {
  // Бюджеты месячные: в режиме «всё время» показываем текущий месяц.
  const month = period === "all" ? currentMonth() : period;
  const c = state.currency;

  const spent = useMemo(() => {
    const totals = new Map<string, number>();
    for (const tx of state.transactions) {
      if (tx.kind === "expense" && tx.date.startsWith(month)) {
        totals.set(tx.categoryId, (totals.get(tx.categoryId) ?? 0) + tx.amount);
      }
    }
    return totals;
  }, [state.transactions, month]);

  const expenseCats = state.categories.filter((cat) => cat.kind === "expense");
  const withBudget = expenseCats.filter((cat) => state.budgets[cat.id]);
  const totalLimit = withBudget.reduce((acc, cat) => acc + state.budgets[cat.id], 0);
  const totalSpent = withBudget.reduce((acc, cat) => acc + (spent.get(cat.id) ?? 0), 0);

  return (
    <section>
      <p className="muted small hint">
        Месячные лимиты на категории расходов. Показан месяц: <b>{monthLabel(month)}</b>. Оставь поле пустым, чтобы
        убрать лимит.
      </p>

      {withBudget.length > 0 && (
        <div className="card budget-total">
          <div className="budget-row-head">
            <strong>Все лимиты</strong>
            <span>
              {formatMoney(totalSpent, c)} из {formatMoney(totalLimit, c)}
            </span>
          </div>
          <Progress value={totalSpent} limit={totalLimit} />
        </div>
      )}

      <ul className="budget-list">
        {expenseCats.map((cat) => (
          <BudgetRow
            key={cat.id}
            name={cat.name}
            color={cat.color}
            limit={state.budgets[cat.id]}
            spent={spent.get(cat.id) ?? 0}
            currency={c}
            onChange={(limit) => dispatch({ type: "setBudget", categoryId: cat.id, limit })}
          />
        ))}
      </ul>
    </section>
  );
}

function BudgetRow({
  name,
  color,
  limit,
  spent,
  currency,
  onChange,
}: {
  name: string;
  color: string;
  limit: number | undefined;
  spent: number;
  currency: string;
  onChange: (limit: number | null) => void;
}) {
  const [draft, setDraft] = useState(limit ? String(limit) : "");
  const [invalid, setInvalid] = useState(false);

  function commit() {
    if (!draft.trim()) {
      setInvalid(false);
      if (limit) onChange(null);
      return;
    }
    const value = parseAmount(draft);
    if (!(value > 0)) return setInvalid(true);
    setInvalid(false);
    if (value !== limit) onChange(value);
  }

  const left = limit ? limit - spent : 0;

  return (
    <li className="card budget-row">
      <div className="budget-row-head">
        <span className="budget-name">
          <span className="dot" style={{ background: color }} />
          {name}
        </span>
        <input
          className={invalid ? "budget-input invalid" : "budget-input"}
          inputMode="decimal"
          placeholder="Без лимита"
          value={draft}
          aria-label={`Лимит для «${name}»`}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        />
      </div>
      {limit ? (
        <>
          <Progress value={spent} limit={limit} />
          <div className="budget-meta small">
            <span className="muted">Потрачено {formatMoney(spent, currency)}</span>
            <span className={left < 0 ? "neg" : "muted"}>
              {left < 0 ? `Превышение ${formatMoney(-left, currency)}` : `Осталось ${formatMoney(left, currency)}`}
            </span>
          </div>
        </>
      ) : (
        spent > 0 && <div className="budget-meta small muted">Потрачено {formatMoney(spent, currency)}</div>
      )}
    </li>
  );
}

function Progress({ value, limit }: { value: number; limit: number }) {
  const ratio = value / limit;
  const level = ratio > 1 ? "over" : ratio >= 0.8 ? "warn" : "ok";
  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(ratio * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`progress-fill ${level}`} style={{ width: `${Math.min(ratio, 1) * 100}%` }} />
    </div>
  );
}
