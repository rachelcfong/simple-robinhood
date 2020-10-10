import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import StockCard from "./StockCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,
  },
}));

// Render a grid of StockCards
const StocksGrid = () => {
  const classes = useStyles();
  const [tickers, setTickers] = useState([]);

  const FETCH_INTERVAL = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:4000/tickers")
        .then((response) => {
          setTickers(response.data);
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    }, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Grid container className={classes.root} justify="center" spacing={4}>
        <Grid item xs={9}>
          <Grid container justify="left" spacing={4}>
            {tickers.map((ticker) => (
              <Grid item xs={4}>
                <div key={ticker.name}>
                  <StockCard ticker={ticker}></StockCard>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StocksGrid;
