import { useMemo, useState, type ReactNode } from "react";
import type { Kind, Period, State, Transaction } from "../types";
import { currentMonth, formatMoney, monthShort, shiftMonth, sumBy } from "../utils";

interface Props {
  state: State;
  periodTxs: Transaction[];
  period: Period;
}

const MONTHS_IN_CHART = 6;

export default function Stats({ state, periodTxs, period }: Props) {
  const [kind, setKind] = useState<Kind>("expense");
  const c = state.currency;

  const slices = useMemo(() => {
    const totals = new Map<string, number>();
    for (const tx of periodTxs) {
      if (tx.kind === kind) totals.set(tx.categoryId, (totals.get(tx.categoryId) ?? 0) + tx.amount);
    }
    return state.categories
      .filter((cat) => totals.has(cat.id))
      .map((cat) => ({ cat, value: totals.get(cat.id)! }))
      .sort((a, b) => b.value - a.value);
  }, [periodTxs, kind, state.categories]);

  const total = slices.reduce((acc, s) => acc + s.value, 0);

  const months = useMemo(() => {
    const last = period === "all" ? currentMonth() : period;
    return Array.from({ length: MONTHS_IN_CHART }, (_, i) => {
      const month = shiftMonth(last, i - MONTHS_IN_CHART + 1);
      const txs = state.transactions.filter((tx) => tx.date.startsWith(month));
      return { month, income: sumBy(txs, "income"), expense: sumBy(txs, "expense") };
    });
  }, [state.transactions, period]);

  const maxBar = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));

  return (
    <section className="stats">
      <div className="card">
        <div className="card-head">
          <h3>По категориям</h3>
          <div className="segmented">
            <button className={kind === "expense" ? "active" : undefined} onClick={() => setKind("expense")}>
              Расходы
            </button>
            <button className={kind === "income" ? "active" : undefined} onClick={() => setKind("income")}>
              Доходы
            </button>
          </div>
        </div>

        {total === 0 ? (
          <p className="empty">Нет {kind === "expense" ? "расходов" : "доходов"} за выбранный период.</p>
        ) : (
          <div className="donut-wrap">
            <Donut slices={slices.map((s) => ({ color: s.cat.color, value: s.value }))} total={total}>
              <span className="muted small">Итого</span>
              <strong>{formatMoney(total, c)}</strong>
            </Donut>
            <ul className="legend">
              {slices.map(({ cat, value }) => (
                <li key={cat.id}>
                  <span className="dot" style={{ background: cat.color }} />
                  <span className="legend-name">{cat.name}</span>
                  <span className="legend-value">{formatMoney(value, c)}</span>
                  <span className="muted legend-pct">{Math.round((value / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Динамика за {MONTHS_IN_CHART} месяцев</h3>
          <div className="chart-legend small">
            <span><i className="swatch inc" />Доходы</span>
            <span><i className="swatch exp" />Расходы</span>
          </div>
        </div>
        <div className="bars">
          {months.map((m) => {
            const net = m.income - m.expense;
            return (
              <div
                key={m.month}
                className="bar-col"
                title={`Доходы: ${formatMoney(m.income, c)}\nРасходы: ${formatMoney(m.expense, c)}`}
              >
                <div className="bar-pair">
                  <div className="bar inc" style={{ height: `${(m.income / maxBar) * 100}%` }} />
                  <div className="bar exp" style={{ height: `${(m.expense / maxBar) * 100}%` }} />
                </div>
                <span className="bar-label">{monthShort(m.month)}</span>
                <span className={`bar-net ${net < 0 ? "neg" : net > 0 ? "pos" : "muted"}`}>
                  {net > 0 ? "+" : ""}
                  {compact(net)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const compactFormat = new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 });
const compact = (n: number) => compactFormat.format(n);

function Donut({
  slices,
  total,
  children,
}: {
  slices: { color: string; value: number }[];
  total: number;
  children: ReactNode;
}) {
  const r = 60;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" role="img" aria-label="Диаграмма по категориям">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--track)" strokeWidth="22" />
        {slices.map((s, i) => {
          const len = (s.value / total) * circumference;
          const el = (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="donut-center">{children}</div>
    </div>
  );
}
