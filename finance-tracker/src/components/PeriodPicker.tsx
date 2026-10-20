import type { Period } from "../types";
import { currentMonth, periodLabel, shiftMonth } from "../utils";

interface Props {
  period: Period;
  onChange: (p: Period) => void;
}

export default function PeriodPicker({ period, onChange }: Props) {
  const isAll = period === "all";
  return (
    <div className="period">
      <button
        className="icon-btn"
        aria-label="Предыдущий месяц"
        disabled={isAll}
        onClick={() => onChange(shiftMonth(period, -1))}
      >
        ‹
      </button>
      <button
        className="period-label"
        title="Переключить: месяц / всё время"
        onClick={() => onChange(isAll ? currentMonth() : "all")}
      >
        {periodLabel(period)}
      </button>
      <button
        className="icon-btn"
        aria-label="Следующий месяц"
        disabled={isAll}
        onClick={() => onChange(shiftMonth(period, 1))}
      >
        ›
      </button>
    </div>
  );
}
