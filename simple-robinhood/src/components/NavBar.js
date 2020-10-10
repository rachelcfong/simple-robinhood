import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: 15,
  },
}));

// Top NavBar in app
const NavBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.navbar} position="static">
        <Typography className={classes.title} variant="h6">
          stocks
        </Typography>
      </AppBar>
    </div>
  );
};

export default NavBar;
