import { useEffect, useRef, useState, type Dispatch, type FormEvent } from "react";
import type { Action } from "../store";
import type { Kind, Period, State, Transaction } from "../types";
import { currentMonth, parseAmount, todayISO, uid } from "../utils";

interface Props {
  state: State;
  initial: Transaction | null;
  defaultDate: Period;
  dispatch: Dispatch<Action>;
  onClose: () => void;
}

/** Дата по умолчанию: сегодня, а если выбран другой месяц — его первое число. */
function pickDefaultDate(period: Period): string {
  if (period === "all" || period === currentMonth()) return todayISO();
  return `${period}-01`;
}

export default function TransactionForm({ state, initial, defaultDate, dispatch, onClose }: Props) {
  const [kind, setKind] = useState<Kind>(initial?.kind ?? "expense");
  const [amount, setAmount] = useState(initial ? String(initial.amount).replace(".", ",") : "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId ?? state.categories.find((c) => c.kind === "expense")?.id ?? "",
  );
  const [date, setDate] = useState(initial?.date ?? pickDefaultDate(defaultDate));
  const [note, setNote] = useState(initial?.note ?? "");
  const [error, setError] = useState("");
  const amountRef = useRef<HTMLInputElement>(null);

  const categories = state.categories.filter((c) => c.kind === kind);

  useEffect(() => amountRef.current?.focus(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function switchKind(next: Kind) {
    setKind(next);
    if (state.categories.find((c) => c.id === categoryId)?.kind !== next) {
      setCategoryId(state.categories.find((c) => c.kind === next)?.id ?? "");
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const value = parseAmount(amount);
    if (!(value > 0)) return setError("Введи сумму больше нуля, например 2500 или 1 250,50");
    if (!categoryId) return setError("Сначала добавь категорию в настройках");
    if (!date) return setError("Укажи дату");
    dispatch({
      type: "saveTx",
      tx: {
        id: initial?.id ?? uid(),
        createdAt: initial?.createdAt ?? Date.now(),
        kind,
        amount: value,
        categoryId,
        date,
        note: note.trim(),
      },
    });
    onClose();
  }

  function remove() {
    if (initial && confirm("Удалить эту операцию?")) {
      dispatch({ type: "deleteTx", id: initial.id });
      onClose();
    }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="sheet" onSubmit={submit} role="dialog" aria-modal="true" aria-label="Операция">
        <h2>{initial ? "Редактировать операцию" : "Новая операция"}</h2>

        <div className="segmented wide">
          <button type="button" className={kind === "expense" ? "active" : undefined} onClick={() => switchKind("expense")}>
            Расход
          </button>
          <button type="button" className={kind === "income" ? "active" : undefined} onClick={() => switchKind("income")}>
            Доход
          </button>
        </div>

        <label>
          Сумма, {state.currency}
          <input
            ref={amountRef}
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            className="amount-input"
          />
        </label>

        <label>
          Категория
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Дата
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>

        <label>
          Комментарий
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Необязательно" maxLength={200} />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          {initial && (
            <button type="button" className="btn danger" onClick={remove}>
              Удалить
            </button>
          )}
          <span className="spacer" />
          <button type="button" className="btn" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="btn primary">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
