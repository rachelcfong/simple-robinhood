import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import useStockContext from "../state/useStockContext";
import StockPriceChange from "./StockPriceChange";
import FullHistoryModal from "./FullHistoryModal";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    width: 400,
    borderRadius: 10,
    boxShadow: "4px 4px 10px #111827",
  },
  content: { padding: 15 },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  companyName: {
    color: "white",
    fontSize: 18,
  },
  price: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  grade: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  graph: {
    marginTop: 40,
    height: 200,
  },
  historyText: {
    marginTop: 15,
    color: "white",
    fontSize: 15,
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

// Display a single StockCard in StockGrid
const StockCard = ({ ticker }) => {
  const classes = useStyles();
  const { stockData, addStockData } = useStockContext();
  const [modalIsOpen, toggleModalIsOpen] = useState(false);
  let tickerStockData = stockData.get(ticker.name);
  let chartData = [];

  // Format chartData for LineChart
  if (tickerStockData) {
    chartData = tickerStockData.map((ticker) => [ticker.date, ticker.price]);
  }

  const handleClick = () => {
    modalIsOpen ? toggleModalIsOpen(false) : toggleModalIsOpen(true);
  };

  // Add the current stock price to stockData in Context Provider
  useEffect(() => {
    addStockData(ticker.name, ticker.price);
  });

  return (
    <div>
      {modalIsOpen ? (
        <FullHistoryModal
          tickerData={tickerStockData}
          open={modalIsOpen}
          toggleModalIsOpen={handleClick}
        />
      ) : null}
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.content}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography className={classes.name}>{ticker.name}</Typography>
                <Typography className={classes.companyName}>{ticker.companyName}</Typography>
                <Typography className={classes.price}>{ticker.price}</Typography>
                <Typography className={classes.grade}>Stock Grade: {ticker.grade}</Typography>
              </Grid>
              <Grid item>
                <StockPriceChange tickerStockData={tickerStockData} />
              </Grid>
            </Grid>
            <div className={classes.graph}>
              <LineChart data={chartData} curve={false} height="200px" min={0} max={35} />
            </div>
            <Typography className={classes.historyText} onClick={handleClick}>
              see full history
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockCard;
