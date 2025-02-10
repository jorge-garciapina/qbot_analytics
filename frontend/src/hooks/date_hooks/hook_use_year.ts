import { useState } from "react";
import dayjs from "dayjs";

export function evaluateYear(dateToProcess: string) {
  return dayjs(dateToProcess).year();
}

export function useYear(dateToProcess: string): {
  year: number;
  updateYear: (newDate: string) => void;
  increaseYearByOne: () => void;
} {
  const [year, setYear] = useState<number>(extractYearFromDate(dateToProcess));
  console.log("INSIDE THE FUNCTION: ", year);

  function extractYearFromDate(date: string) {
    return dayjs(date).year();
  }

  function updateYear(newDate: string) {
    setYear(extractYearFromDate(newDate));
  }

  function increaseYearByOne() {
    setYear(year + 1);
  }

  return {
    year: year,
    updateYear,
    increaseYearByOne,
  };
}
