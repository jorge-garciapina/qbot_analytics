//TODO: IT IS IMPORTANT TO NOTICE THAT THIS IS THE CONFIGURATION FILE FOR THE TIC-TAC-TOE GAME
// I NEED TO ADDAPT THESE ENTRIES TO THE LOGIC OF THIS PROJECT, I WILL LEAVE THEM HERE JUST
// TO HAVE AN IDEA OF HOW TO PROCEED.

import "@mui/material/Paper";
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    boardItem: true;
  }
}

// In this part I should declare the different variatons for the buttons
// This comes as a "substitution" for the custom components that I had originally
// planned but resulted not practical
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    startGame: true;
  }
}

//////////////////////////////////
// TYPOGRAPHY:
declare module "@mui/material/styles" {
  interface TypographyVariants {
    modalChartTitle: React.CSSProperties;
    modalChartText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    modalChartTitle?: React.CSSProperties;
    modalChartText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    modalChartTitle: true;
    modalChartText: true;
  }
}

import "@mui/material/styles";

//TODO: THIS IS PROVISIONAL, WHEN MERGING THE CODE WITH EDMUNDO'S THIS SHOULD BE REMOVED
declare module "@mui/material/styles" {
  interface Palette {
    test: PaletteColor;
  }

  interface PaletteOptions {
    test?: PaletteColorOptions;
  }
}
