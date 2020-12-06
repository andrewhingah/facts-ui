import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
// components
import Header from "./Header";
// styles
import useStyles from "./styles";
// pages
import CreateCustomer from "./AddCustomerDetails";
import CustomerDetails from "./CustomerDetails";
// context
import { useLayoutState } from "../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <Switch>
          <Route path="/app/data-listing" component={CustomerDetails} />
          <Route exact path="/app/create" component={CreateCustomer} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Layout);
