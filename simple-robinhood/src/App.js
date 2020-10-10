import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { Grid } from "@material-ui/core";
import { StockContextProvider } from "./state/useStockContext";
import "./App.css";
import NavBar from "./components/NavBar";
import StocksGrid from "./components/StocksGrid";

const App = () => {
  return (
    <div class="App">
      <ThemeProvider theme={theme}>
        <StockContextProvider>
          <CssBaseline />
          <NavBar />
          <Grid container justify="center">
            <Grid item>
              <StocksGrid />
            </Grid>
          </Grid>
        </StockContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
