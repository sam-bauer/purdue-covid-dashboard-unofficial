import React from "react";
import HomePage from "./HomePage";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ec971f"
    },
    secondary: {
      main: "#cfb991"
    },
    background: {
      paper: "#3b3b3b",
      default: "#202020"
    },
    text: {
      primary: "#EBEBEB",
      secondary: "#eeeeee"
    },
    warning: {
      main: "#555960"
    },
    success: {
      main: "#199974"
    },
    error: {
      main: "#a94442"
    },
    info: {
      main: "#337ab7"
    }
  },
  typography: {
    fontFamily: "Lato",
    h1: {
      fontFamily: "Merriweather"
    },
    h2: {
      fontFamily: "Merriweather"
    },
    h3: {
      fontFamily: "Merriweather"
    },
    h4: {
      fontFamily: "Merriweather"
    },
    h5: {
      fontFamily: "Merriweather"
    },
    h6: {
      fontFamily: "Merriweather"
    }
  },
  props: {
    MuiAppBar: {
      color: "transparent"
    }
  }
});

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </div>
  );
}
