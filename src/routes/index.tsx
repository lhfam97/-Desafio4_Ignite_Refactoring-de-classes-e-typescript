import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import React from "react";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);

export default Routes;
