import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // TO DO: Fix modal to top of screen
  modal: {
    position: "fixed",
    top: 0,
  },
  content: {
    padding: 20,
  },
  table: {
    marginTop: 10,
  },
  tableHead: {
    backgroundColor: theme.palette.success.main,
  },
  text: {
    textAlign: "center",
  },
}));

// Display the full price history table of a specific stock
const FullHistoryModal = ({ tickerData, open, toggleModalIsOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    toggleModalIsOpen();
  };

  return (
    <div>
      <Dialog className={classes.modal} fullWidth={true} open={open} onClose={handleClose}>
        <div className={classes.content}>
          <Typography className={classes.text} variant="h6">
            Full History
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickerData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date.toLocaleString()}</TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

export default FullHistoryModal;
