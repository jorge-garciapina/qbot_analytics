// TODO: I need to learn about the roles of the vite-env.d.ts and the typesConfig.d.ts

import { lime, purple } from "@mui/material/colors";
// import { lime, purple, green, orange } from "@mui/material/colors";

import { createTheme } from "@mui/material/styles";

// Create a itemBoardTheme instance
export const mainTheme = createTheme({
  palette: {
    primary: {
      main: lime[500],
      light: lime[300],
      dark: lime[700],
    },
    secondary: {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
    },
    //TODO: THIS IS PROVISIONAL, WHEN MERGING THE CODE WITH EDMUNDO'S THIS SHOULD BE REMOVED
    test: {
      main: "rgb(255,255,255)",
      light: "rgb(127,139,155)",
      dark: "rgb(48,63,84)",
      icon: "rgb(189,197,207)",
      black: "rgb(0,0,0)",
      chartBorder: "rgb(233,238,245)",
    },
  },

  typography: {
    fontFamily: "'Instrument Sans', 'Roboto', 'Arial', sans-serif",
    // In order to include variants, fo to the typesConfig.d.ts file and include them
    modalChartTitle: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#333", // Example color
    },
    modalChartText: {
      fontSize: "1rem",
      fontWeight: 700,
      color: "#333", // Example color
    },
  },
});
