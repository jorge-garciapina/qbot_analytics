/**
 * 📌 Validates and adjusts the date range for daily call data.
 * Ensures:
 *  - Proper date format and logical order.
 *  - If the date range exceeds 30 days, it defaults to the last 30 years from the end date.
 *  - If input is missing or invalid, it defaults to a valid 30-year range.
 *
 * @param startDate - The requested start date in ISO format.
 * @param endDate - The requested end date in ISO format.
 * @returns A tuple `[validatedStartDate, validatedEndDate]` after validation and adjustment.
 */
export function validateAndAdjustDailyRange(
  startDate: string,
  endDate: string
): [string, string] {
  // 🛑 Handle missing dates by defaulting to a 30-year range ending today
  if (!startDate || !endDate) {
    const now = new Date();
    return [
      new Date(now.setFullYear(now.getFullYear() - 30)).toISOString(),
      now.toISOString(),
    ];
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  // 🛑 Check if the input dates are invalid; default to a 30-year range
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const now = new Date();
    return [
      new Date(now.setFullYear(now.getFullYear() - 30)).toISOString(),
      now.toISOString(),
    ];
  }

  // 🔄 Ensure `startDate` is always before `endDate` by swapping if necessary
  if (start > end) {
    [start, end] = [end, start];
  }

  // 📏 Calculate the total number of days in the range
  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 🛑 If the range exceeds 30 days, adjust it to be 30 years before the end date
  if (totalDays > 30) {
    start = new Date(end);
    start.setFullYear(start.getFullYear() - 30);
  }

  return [start.toISOString(), end.toISOString()];
}
