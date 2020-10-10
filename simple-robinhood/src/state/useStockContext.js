import constate from "constate";

// Store historical stock data in a context provider for easier access
// in future features, esp. as we add new pages and components to avoid
// prop drilling stockData.

function createData(date, price) {
  return { date, price };
}

function useStockData() {
  const stockData = new Map();

  const addStockData = (name, newStockData) => {
    if (stockData.has(name)) {
      let tickerStockData = stockData.get(name);
      tickerStockData.push(createData(new Date(), newStockData));
    } else {
      stockData.set(name, [createData(new Date(), newStockData)]);
    }
  };

  return {
    stockData,
    addStockData,
  };
}

const [StockContextProvider, useStockContext] = constate(useStockData);

export { StockContextProvider };

export default useStockContext;
