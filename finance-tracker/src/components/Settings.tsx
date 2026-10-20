import { useRef, useState, type Dispatch, type FormEvent } from "react";
import { defaultState, PALETTE, parseState, type Action } from "../store";
import type { Category, Kind, State } from "../types";
import { downloadFile, todayISO, uid } from "../utils";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

export default function Settings({ state, dispatch }: Props) {
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const usage = new Map<string, number>();
  for (const tx of state.transactions) usage.set(tx.categoryId, (usage.get(tx.categoryId) ?? 0) + 1);

  function exportJson() {
    downloadFile(`finance-${todayISO()}.json`, JSON.stringify(state, null, 2), "application/json");
  }

  function exportCsv() {
    const names = new Map(state.categories.map((c) => [c.id, c.name]));
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = [...state.transactions]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((tx) =>
        [
          tx.date,
          tx.kind === "income" ? "Доход" : "Расход",
          esc(names.get(tx.categoryId) ?? ""),
          String(tx.amount).replace(".", ","),
          esc(tx.note),
        ].join(";"),
      );
    // BOM — чтобы Excel корректно открыл кириллицу
    const csv = "﻿" + ["Дата;Тип;Категория;Сумма;Комментарий", ...rows].join("\r\n");
    downloadFile(`finance-${todayISO()}.csv`, csv, "text/csv;charset=utf-8");
  }

  async function importJson(file: File) {
    try {
      const parsed = parseState(JSON.parse(await file.text()));
      if (!parsed) return setMessage("Файл не похож на резервную копию этого приложения.");
      if (!confirm(`Заменить текущие данные? В файле ${parsed.transactions.length} операций.`)) return;
      dispatch({ type: "replace", state: parsed });
      setMessage(`Импортировано операций: ${parsed.transactions.length}.`);
    } catch {
      setMessage("Не удалось прочитать файл.");
    }
  }

  function resetAll() {
    if (confirm("Удалить все операции, категории и бюджеты? Это действие нельзя отменить.")) {
      dispatch({ type: "replace", state: defaultState() });
      setMessage("Данные сброшены.");
    }
  }

  return (
    <section className="settings">
      <div className="card">
        <h3>Категории</h3>
        {(["expense", "income"] as Kind[]).map((kind) => (
          <div key={kind} className="cat-group">
            <h4 className="muted">{kind === "expense" ? "Расходы" : "Доходы"}</h4>
            <ul className="cat-list">
              {state.categories
                .filter((c) => c.kind === kind)
                .map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    used={usage.get(cat.id) ?? 0}
                    onSave={(category) => dispatch({ type: "saveCategory", category })}
                    onDelete={() => dispatch({ type: "deleteCategory", id: cat.id })}
                  />
                ))}
            </ul>
          </div>
        ))}
        <AddCategory
          count={state.categories.length}
          onAdd={(category) => dispatch({ type: "saveCategory", category })}
        />
      </div>

      <div className="card">
        <h3>Валюта</h3>
        <input
          className="currency-input"
          value={state.currency}
          maxLength={4}
          aria-label="Символ валюты"
          onChange={(e) => dispatch({ type: "setCurrency", currency: e.target.value })}
          onBlur={(e) => !e.target.value.trim() && dispatch({ type: "setCurrency", currency: "₸" })}
        />
      </div>

      <div className="card">
        <h3>Данные</h3>
        <p className="muted small">
          Все данные хранятся только в этом браузере. Регулярно сохраняй резервную копию, чтобы не потерять их при
          очистке браузера или смене устройства.
        </p>
        <div className="btn-row">
          <button className="btn primary" onClick={exportJson}>
            Скачать резервную копию (JSON)
          </button>
          <button className="btn" onClick={() => fileRef.current?.click()}>
            Восстановить из копии
          </button>
          <button className="btn" onClick={exportCsv} disabled={state.transactions.length === 0}>
            Экспорт в CSV (Excel)
          </button>
          <button className="btn danger" onClick={resetAll}>
            Сбросить всё
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importJson(file);
            e.target.value = "";
          }}
        />
        {message && <p className="small">{message}</p>}
      </div>
    </section>
  );
}

function CategoryRow({
  category,
  used,
  onSave,
  onDelete,
}: {
  category: Category;
  used: number;
  onSave: (c: Category) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(category.name);

  return (
    <li className="cat-row">
      <input
        type="color"
        value={category.color}
        aria-label="Цвет"
        onChange={(e) => onSave({ ...category, color: e.target.value })}
      />
      <input
        className="cat-name"
        value={name}
        aria-label="Название категории"
        onChange={(e) => setName(e.target.value)}
        onBlur={() => {
          const trimmed = name.trim();
          if (trimmed && trimmed !== category.name) onSave({ ...category, name: trimmed });
          else setName(category.name);
        }}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
      />
      <span className="muted small cat-used">{used || ""}</span>
      <button
        className="icon-btn"
        aria-label={`Удалить «${category.name}»`}
        title={used ? "Категория используется в операциях — сначала измени или удали их" : "Удалить"}
        disabled={used > 0}
        onClick={() => confirm(`Удалить категорию «${category.name}»?`) && onDelete()}
      >
        ×
      </button>
    </li>
  );
}

function AddCategory({ count, onAdd }: { count: number; onAdd: (c: Category) => void }) {
  const [name, setName] = useState("");
  const [kind, setKind] = useState<Kind>("expense");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ id: uid(), name: name.trim(), kind, color: PALETTE[count % PALETTE.length] });
    setName("");
  }

  return (
    <form className="add-cat" onSubmit={submit}>
      <input placeholder="Новая категория" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
      <select value={kind} onChange={(e) => setKind(e.target.value as Kind)} aria-label="Тип категории">
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
      </select>
      <button className="btn primary" type="submit" disabled={!name.trim()}>
        Добавить
      </button>
    </form>
  );
}
