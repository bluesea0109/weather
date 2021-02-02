import React from "react"
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom"
import { Weather } from "pages"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact path="/" to="/weather" />
      <Route exact path="/weather" component={Weather} />
    </Switch>
  </BrowserRouter>
)

export default Routes
