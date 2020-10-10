import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  negativeCard: {
    backgroundColor: theme.palette.warning.main,
    width: 100,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  positiveCard: {
    backgroundColor: theme.palette.success.main,
    width: 100,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    marginRight: 3,
    textAlign: "center",
  },
}));

const getDifference = (tickerStockData, INTERVAL) => {
  const dataLength = tickerStockData.length;
  let difference =
    tickerStockData[dataLength - 1].price - tickerStockData[dataLength - INTERVAL].price;
  return (Math.ceil(difference * 100) / 100).toFixed(2);
};

// Return mini card with the change in stock price between now and a set INTERVAL
const StockPriceChange = ({ tickerStockData }) => {
  const classes = useStyles();
  const INTERVAL = 5;

  let difference = Number.parseFloat(0).toFixed(2);

  // Calculate the difference between the latest price and the price INTERVAL iterations ago
  if (tickerStockData && tickerStockData.length >= INTERVAL) {
    difference = getDifference(tickerStockData, INTERVAL);
  }

  return (
    <div>
      <Card className={difference >= 0 ? classes.positiveCard : classes.negativeCard}>
        <CardContent>
          <Typography className={classes.name}>{difference}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockPriceChange;
