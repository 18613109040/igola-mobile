import React from 'react';
import { routerRedux, Route, Switch, Redirect, Router  } from 'dva/router';
const { ConnectedRouter } = routerRedux;
import Loadable from 'react-loadable';
import Loading from '../components/Loading';
const Flights = Loadable.Map({
  loader: {
    Flights: () => import('../pages/Flights'),
  },
  delay: 200,
  timeout: 1000,
  loading: Loading,
  render(loaded, props) {
    const Flights = loaded["Flights"].default
    return <Flights { ...props}/>
  }
})
const Routers = ({ history, app }) => {
  const {
    location: { pathname },
  } = history;
  window.g_app = app 
  return (
    <ConnectedRouter history={history}>
        <Switch>
          <Route path="/flights"  exact  component={Flights}  />
          <Redirect to="/flights" />
        </Switch>
    </ConnectedRouter>
  );
};

export default Routers;
