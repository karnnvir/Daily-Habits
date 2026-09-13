import { addDays, format, parseISO } from "date-fns";

export function todayIso(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function addDaysIso(dateIso: string, delta: number): string {
  return format(addDays(parseISO(dateIso), delta), "yyyy-MM-dd");
}

export function yesterdayIso(): string {
  return addDaysIso(todayIso(), -1);
}
