import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  backgroundColor: "pink",
  //   flexDirection: "column",
  borderColor: theme.palette.secondary.dark,
  //   borderWidth: "5px",
  //   border: "solid",
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  //   overflow: "auto",
  //   zIndex: 1000,
}));
