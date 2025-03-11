import { useEffect, useState } from "react";
import { useDate } from "..";

export type ValidGranularities =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

interface UseGranularityOutput {
  granularity: ValidGranularities;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
}

export function useGranularity(
  initialDate: string,
  endDate: string
): UseGranularityOutput {
  // Merged Granularity State
  const [granularity, setGranularity] = useState<ValidGranularities>("yearly");

  // Date Management Logic
  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);

  // Sync initial and end dates based on granularity
  useEffect(() => {
    const currentDate = new Date();

    if (granularity === "yearly") {
      initialDayLogic.updateDate(initialDate);
      endDayLogic.updateDate(endDate);
    } else if (granularity === "monthly") {
      initialDayLogic.updateDate(getPreviousMonthsDate(currentDate, 12));
      endDayLogic.updateDate(formatDate(currentDate));
    } else if (granularity === "daily") {
      initialDayLogic.updateDate(getPreviousDaysDate(currentDate, 12));
      endDayLogic.updateDate(formatDate(currentDate));
    }
  }, [granularity, initialDate, endDate]);

  // Function to update granularity
  function granularityModifier(newGranularity: ValidGranularities) {
    setGranularity(newGranularity);
  }

  return {
    granularity,
    granularityModifier,
    initialDate: initialDayLogic.date,
    endDate: endDayLogic.date,
    initialDateModifier: initialDayLogic.updateDate,
    endDateModifier: endDayLogic.updateDate,
  };
}

/**
 * Helper function to get the date X months ago from a given date
 */
function getPreviousMonthsDate(date: Date, monthsAgo: number): string {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - monthsAgo);
  return formatDate(newDate);
}

/**
 * Helper function to get the date X days ago from a given date
 */
function getPreviousDaysDate(date: Date, daysAgo: number): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - daysAgo);
  return formatDate(newDate);
}

/**
 * Helper function to format date as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
function formatDate(date: Date): string {
  return date.toISOString();
}
