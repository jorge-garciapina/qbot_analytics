/**
 * 📌 Validates and adjusts the date range for yearly call data.
 * Ensures:
 *  - Proper date format and logical order.
 *  - If the range exceeds 5 years, it adjusts to the last 5 years from the end date.
 *  - If input is missing or invalid, it defaults to a valid 5-year range.
 *
 * @param startDate - The requested start date in ISO format.
 * @param endDate - The requested end date in ISO format.
 * @returns A tuple `[validatedStartDate, validatedEndDate]` after validation and adjustment.
 */
export function validateAndAdjustYearlyRange(
  startDate: string,
  endDate: string
): [string, string] {
  // 🛑 Handle missing dates by defaulting to a 5-year range ending today
  if (!startDate || !endDate) {
    const now = new Date();
    const fiveYearsBefore = new Date(now);
    fiveYearsBefore.setFullYear(fiveYearsBefore.getFullYear() - 5);
    return [fiveYearsBefore.toISOString(), now.toISOString()];
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  // 🛑 Check if the input dates are invalid; default to a 5-year range
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const now = new Date();
    const fiveYearsBefore = new Date(now);
    fiveYearsBefore.setFullYear(fiveYearsBefore.getFullYear() - 5);
    return [fiveYearsBefore.toISOString(), now.toISOString()];
  }

  // 🔄 Ensure `startDate` is before `endDate`, swapping if necessary
  if (start > end) {
    [start, end] = [end, start];
  }

  // 📏 Calculate the total number of years in the range
  const totalYears = end.getUTCFullYear() - start.getUTCFullYear();

  // 🛑 If the range exceeds 5 years, adjust it to the last 5 years from the end date
  if (totalYears > 5) {
    start.setFullYear(end.getUTCFullYear() - 5);
  }

  return [start.toISOString(), end.toISOString()];
}
