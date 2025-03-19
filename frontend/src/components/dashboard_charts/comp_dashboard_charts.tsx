// CHARTS IMPORTS:
import HandlingOverviewChart from "../charts/handling_overview/comp_handling_overview_dashboard_chart";

// COMPONENT IMPORTS

import { DashboardChartsContainer } from "./styled_dashboard_charts_container";
import { DateRangeSelector } from "../date_related_components/comp_range_selector";

// HOOKS
import { useDate } from "../../hooks/";

// LIBRARY IMPORTS
import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DashboardCharts = () => {
  //----------------START: Translation Section----------------
  const { t, i18n } = useTranslation();
  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
  };
  //----------------END: Translation Section----------------
  //-------------------------------------------------------------
  //----------------START: Refresh Section----------------
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  function handleRefresh() {
    setRefreshTrigger(Date.now()); // Update the trigger
  }
  //----------------END: Refresh Section----------------
  //-------------------------------------------------------------
  //----------------START: Date Section----------------
  // TODO: it is important to consider that this functionality might be removed,
  //       (the date interval will be controlled in the details or data modals)
  const { initialDate: start, endDate: end } = generateInitialDateInterval({
    daysInterval: 7,
  });
  const initialDayLogic = useDate(start);
  const endDayLogic = useDate(end);
  //----------------END: Date Section----------------
  //-------------------------------------------------------------

  return (
    <DashboardChartsContainer>
      <Button variant="contained" onClick={handleRefresh}>
        Refresh
      </Button>
      <Button variant="contained" onClick={toggleLanguage}>
        {t("changeLanguage")}
      </Button>{" "}
      <DateRangeSelector
        initialDateModifier={(date) => {
          initialDayLogic.updateDate(date);
        }}
        endDateModifier={(date) => {
          endDayLogic.updateDate(date);
        }}
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
      />
      <HandlingOverviewChart
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
        refreshTrigger={refreshTrigger}
      />
    </DashboardChartsContainer>
  );
};

export default DashboardCharts;

//////////////////////////////////////////////////////////
// UTILS:
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
function generateInitialDateInterval({
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
