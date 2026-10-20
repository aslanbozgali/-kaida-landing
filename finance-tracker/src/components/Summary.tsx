import type { Period, State, Transaction } from "../types";
import { formatMoney, sumBy } from "../utils";

interface Props {
  state: State;
  periodTxs: Transaction[];
  period: Period;
}

export default function Summary({ state, periodTxs, period }: Props) {
  const income = sumBy(periodTxs, "income");
  const expense = sumBy(periodTxs, "expense");
  const total = sumBy(state.transactions, "income") - sumBy(state.transactions, "expense");
  const net = income - expense;
  const c = state.currency;

  return (
    <section className="summary">
      <div className="balance-card">
        <span className="muted">Общий баланс</span>
        <strong className={total < 0 ? "neg" : undefined}>{formatMoney(total, c)}</strong>
        {period !== "all" && (
          <span className="muted small">
            За месяц: <b className={net < 0 ? "neg" : "pos"}>{net > 0 ? "+" : ""}{formatMoney(net, c)}</b>
          </span>
        )}
      </div>
      <div className="stat-card">
        <span className="muted">Доходы</span>
        <strong className="pos">{formatMoney(income, c)}</strong>
      </div>
      <div className="stat-card">
        <span className="muted">Расходы</span>
        <strong className="neg">{formatMoney(expense, c)}</strong>
      </div>
    </section>
  );
}
