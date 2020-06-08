import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";

import App from "./App";
import AppLedger from "./AppLedger";
import "./index.css";
import Start from "./Start";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/mainnet" component={() => <App network="mainnet" />} />
      <Route exact path="/testnet" component={() => <App network="testnet" />} />
      <Route exact path="/ledger-mainnet" component={() => <AppLedger network="mainnet" />} />
      <Route exact path="/ledger-testnet" component={() => <AppLedger network="testnet" />} />
      <Route component={() => <Start />} />
    </Switch>
  </HashRouter>,
  document.getElementById("root"),
);
