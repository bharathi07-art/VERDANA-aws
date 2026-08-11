// src/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#4C2B12" },    // Timber Breeze
    secondary: { main: "#798262" },  // Canopy Green
    background: { default: "#ffffff" }, // Fern Whisper
    text: { primary: "#33352C" },    // Deepwood Shade
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});