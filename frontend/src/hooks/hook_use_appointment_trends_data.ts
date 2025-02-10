// import { useYear, evaluateYear } from "./date_hooks/hook_use_year";
import { evaluateYear } from "./date_hooks/hook_use_year";
import { useTranslation } from "react-i18next";
import { validateChronologicalOrder } from "../utils/validations/utils_date_validations";
import { UseTrendsData } from "./hook_use_fetch_yearly_records";
import { TrendsYearData, DateRange } from "../types/data_types";
import { preventInvalidExit } from "../utils/error_handlers/utils_exit_error";

/**
 * Custom hook that returns processed appointment trends data for a given date range.
 *
 * @param param0 - An object with `initialDate` and `endDate` strings.
 * @returns An object containing the processed data, a loading flag, and chart-related series.
 */
export function useAppointmentTrendsData({ initialDate, endDate }: DateRange) {
  console.log("INITIAL YEAR BEFORE: ", initialDate);
  console.log("END YEAR BEFORE: ", endDate);

  // const initialYear = useYear(initialDate);
  // const endYear = useYear(endDate);

  const initialYear = evaluateYear(initialDate);
  const endYear = evaluateYear(endDate);

  console.log("INITIAL YEAR AFTER: ", initialYear);
  console.log("END YEAR AFTER: ", endYear);

  const { t } = useTranslation();

  // Validate input dates
  validateChronologicalOrder({
    initialYear: initialYear,
    endYear: endYear,
    errorMessage: t("errors.dateErrors.dateFormatIncompatibility"),
  });

  if (areYearsEqual({ initialYear: initialYear, endYear: endYear })) {
    return dataForSingleYear(initialYear);
  } else if (
    areYearsInCorrectOrder({
      initialYear: initialYear,
      endYear: endYear,
    })
  ) {
    return dataForMultipleYears({
      initialYear: initialYear,
      endYear: endYear,
    });
  }

  preventInvalidExit(t("errors.exitErrors.invalidDateFormat"));

  return { processedData: [], isAnyPending: true };
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// UTILITIES ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
interface YearsInput {
  initialYear: number;
  endYear: number;
}
// //----------------------------------------------------------------------------
function areYearsEqual({ initialYear, endYear }: YearsInput) {
  return initialYear === endYear;
}
// //----------------------------------------------------------------------------
function areYearsInCorrectOrder({ initialYear, endYear }: YearsInput) {
  return initialYear < endYear;
}
// //----------------------------------------------------------------------------
// function generateYearsArray({ initialYear, endYear }: YearsInput): number[] {
//   const years: number[] = [];
//   for (let i = initialYear; i <= endYear; i++) {
//     years.push(i);
//   }
//   return years;
// }

function generateYearsArray({ initialYear, endYear }: YearsInput): number[] {
  const years: number[] = [];
  for (let i = initialYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
}

// //----------------------------------------------------------------------------
function dataForMultipleYears({ initialYear, endYear }: YearsInput) {
  const yearArray = generateYearsArray({
    initialYear: initialYear,
    endYear: endYear,
  });

  console.log(yearArray);

  // Process yearly data while ensuring type consistency
  const processedData: TrendsYearData[] = yearArray.map((year) => {
    return UseTrendsData(year);
  });

  const isAnyPending = processedData.some((entry) => entry.isPending);

  return { processedData, isAnyPending };
}
// //----------------------------------------------------------------------------

function dataForSingleYear(currentYear: number) {
  const yearData = UseTrendsData(currentYear);

  return {
    processedData: [yearData],
    isAnyPending: yearData.isPending,
  };
}
