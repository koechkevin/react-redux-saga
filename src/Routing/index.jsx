import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import HigherOrderComponent from '../HOC/Authenticate';
import routes from './routes';
import NotFound from '../views/Home/NotFound';

const Routes = () =>  (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/auth" exact component={Home} />
    {
      routes.map((each) => (
        <Route
          key={each.path}
          path={each.path}
          exact component={
            HigherOrderComponent({
              Container: each.component,
              allowedRoles: each.allowedRoles
            })
          }
        />
      ))
    }
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
