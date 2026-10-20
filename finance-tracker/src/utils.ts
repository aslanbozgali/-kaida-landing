import type { Period, Transaction } from "./types";

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

const pad = (n: number) => String(n).padStart(2, "0");

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function currentMonth(): string {
  return todayISO().slice(0, 7);
}

export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const MONTHS_SHORT = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MONTHS_GEN = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const WEEKDAYS = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function monthShort(month: string): string {
  return MONTHS_SHORT[Number(month.slice(5, 7)) - 1];
}

export function periodLabel(period: Period): string {
  return period === "all" ? "Всё время" : monthLabel(period);
}

export function dayLabel(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const today = todayISO();
  if (date === today) return "Сегодня";
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date === `${yesterday.getFullYear()}-${pad(yesterday.getMonth() + 1)}-${pad(yesterday.getDate())}`) {
    return "Вчера";
  }
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  const sameYear = String(y) === today.slice(0, 4);
  return `${d} ${MONTHS_GEN[m - 1]}${sameYear ? "" : ` ${y}`}, ${weekday}`;
}

export function inPeriod(tx: Transaction, period: Period): boolean {
  return period === "all" || tx.date.startsWith(period);
}

const numberFormat = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });

export function formatMoney(value: number, currency: string): string {
  return `${numberFormat.format(value)} ${currency}`;
}

/** Разбирает ввод вида "12 500,50" → 12500.5; возвращает NaN, если ввод некорректен */
export function parseAmount(input: string): number {
  const cleaned = input.replace(/[\s ]/g, "").replace(",", ".");
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return NaN;
  return Number(cleaned);
}

export function sumBy(list: Transaction[], kind: Transaction["kind"]): number {
  return list.reduce((acc, tx) => (tx.kind === kind ? acc + tx.amount : acc), 0);
}

export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
