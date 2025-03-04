/**
 * 📌 Validates and adjusts the date range for monthly call data.
 * Ensures:
 *  - Proper date format and logical order.
 *  - If the range exceeds 12 months, it adjusts to the first 12 months from the start date.
 *  - If input is missing or invalid, it defaults to a valid 12-month range.
 *
 * @param startDate - The requested start date in ISO format.
 * @param endDate - The requested end date in ISO format.
 * @returns A tuple `[validatedStartDate, validatedEndDate]` after validation and adjustment.
 */
export function validateAndAdjustMonthlyRange(
  startDate: string,
  endDate: string
): [string, string] {
  // 🛑 Handle missing dates by defaulting to a 12-month range ending today
  if (!startDate || !endDate) {
    const now = new Date();
    const oneYearBefore = new Date(now);
    oneYearBefore.setMonth(oneYearBefore.getMonth() - 12);
    return [oneYearBefore.toISOString(), now.toISOString()];
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  // 🛑 Check if the input dates are invalid; default to a 12-month range
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const now = new Date();
    const oneYearBefore = new Date(now);
    oneYearBefore.setMonth(oneYearBefore.getMonth() - 12);
    return [oneYearBefore.toISOString(), now.toISOString()];
  }

  // 🔄 Ensure `startDate` is before `endDate`, swapping if necessary
  if (start > end) {
    [start, end] = [end, start];
  }

  // 📏 Calculate the total number of months in the range
  const totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());

  // 🛑 If the range exceeds 12 months, adjust it to 12 months from the start date
  if (totalMonths > 12) {
    end = new Date(start);
    end.setMonth(start.getMonth() + 12);
  }

  return [start.toISOString(), end.toISOString()];
}
