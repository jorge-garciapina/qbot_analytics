import dayjs from "dayjs";
export function evaluateYear(dateToProcess: string) {
  return dayjs(dateToProcess).year();
}
