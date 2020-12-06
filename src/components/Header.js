import React from "react";
import { AppBar, Box, Toolbar } from "@material-ui/core";
import useStyles from "./styles";

export default function Header(props) {
  var classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box variant="h6" weight="medium" className={classes.logotype}>
          FACTS AFRICA
        </Box>
      </Toolbar>
    </AppBar>
  );
}
