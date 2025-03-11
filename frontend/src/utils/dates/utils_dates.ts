/**
 * Generates a date interval starting a specified number of days in the past
 * and ending on the current day. By default, it covers the last 7 days.
 *
 * @param options - Configuration object for the function.
 * @param options.daysInterval - The total number of days in the interval. Defaults to 7.
 * @returns An object containing:
 *  - initialDate: The start of the interval (UTC, ISO string).
 *  - endDate: The end of the interval (UTC, ISO string).
 */
export function generateInitialDateInterval({
  daysInterval = 7,
}: {
  daysInterval?: number;
}): {
  initialDate: string;
  endDate: string;
} {
  // Get "today" as a Date object (local time)
  const todayDate = new Date();

  // Extract year, month, and day from today's date
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth();
  const currentDay = todayDate.getDate();

  // 'endDate' is set to today's date at 00:00 UTC (the "end" of the interval).
  // By setting hours, minutes, and seconds to zero, we ensure the time is midnight in UTC.
  const endDate = new Date(
    Date.UTC(currentYear, currentMonth, currentDay, 0, 0, 0)
  ).toISOString();

  // 'initialDate' is set to (daysInterval - 1) days before today at 00:00 UTC
  // (because if you want a 7-day interval, for instance, you go back 6 days from 'today')
  const initialDate = new Date(
    Date.UTC(
      currentYear,
      currentMonth,
      currentDay - (daysInterval - 1),
      0,
      0,
      0
    )
  ).toISOString();

  // Return both dates as ISO strings for easy parsing and usage elsewhere
  return {
    initialDate,
    endDate,
  };
}
