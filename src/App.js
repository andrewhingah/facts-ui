import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";

export default function App() {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/data-listing" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/data-listing" />}
        />
        <PrivateRoute path="/app" component={Layout} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            React.createElement(component, props)
         
        }
      />
    );
  }

}
