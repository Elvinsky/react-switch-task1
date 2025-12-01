import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2a9461",
      light: "#60c690",
      dark: "#006637",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#494c7d",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default customTheme;
