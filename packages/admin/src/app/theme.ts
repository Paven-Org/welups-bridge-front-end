import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const welupsBridgeTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#666E75",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "64px",
          color: "#ffffff",
          backgroundColor: "#2A323D",
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#2A323D",
          },
          "&:hover fieldset": {
            borderColor: "#ffffff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          color: "#ffffff",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          color: "#ffffff",
          backgroundColor: "#1F2630",
        },
      },
    },
  },
});

export default welupsBridgeTheme;
