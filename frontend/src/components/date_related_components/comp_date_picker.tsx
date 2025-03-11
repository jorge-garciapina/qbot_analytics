import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledDatePicker } from "./styled_date_picker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useClinicData } from "../../hooks/use_clinic_data";

interface DatePickerInput {
  dateModifier: (date: string) => void;
  initialDate: string;
  endDate: string;
  role: "initial_date_selector" | "end_date_selector";
}

export const DayPicker: React.FC<DatePickerInput> = ({
  dateModifier,
  role,
  initialDate,
  endDate,
}) => {
  const { t } = useTranslation();

  const { initialDate: minClinicDate } = useClinicData();

  const defaultValue = role === "initial_date_selector" ? initialDate : endDate;

  const minDate =
    role === "initial_date_selector"
      ? dayjs(minClinicDate) // Global lower bound (adjust as needed)
      : dayjs(initialDate);

  const maxDate =
    role === "initial_date_selector"
      ? dayjs(endDate) // Restrict initial date selection to before the end date
      : undefined; // No upper limit for endDate selection

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        // label="Select a Day"
        label={t("dateRangeSelector.label")}
        defaultValue={dayjs(defaultValue)}
        onChange={(chosenDate) => {
          if (chosenDate) {
            dateModifier(chosenDate.format()); // Pass the ISO string to the dateModifier
          }
        }}
        views={["year", "month", "day"]}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};
