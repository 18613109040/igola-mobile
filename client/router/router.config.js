/**
 * 全局路由配置
 * 使用 react-loadable   Loadable.Map方式注册路由和model 
 */
import React from 'react';
import Loadable from 'react-loadable';
import {
  registerModel
} from "../utils/register";
import Loading from '../components/Loading';
const routes = [
  {
    path: '/flights',
    name: 'flights',
    component: (app) => Loadable.Map({
      loader: {
        Flights: () => import('../pages/Flights'),
        // user: () => import('../models/user')
      },
      delay: 200,
      timeout: 1000,
      loading: Loading,
      render(loaded, props) {
        const Flights = loaded["Flights"].default
        // const user = loaded["user"].default
        // registerModel(app, user)
        return <Flights { ...props}/>
      }
    })
  }
]

export const getRoutes = (app) => {
  return routes.map((route) => {
    if (route.component) {
      route.component = route.component(app);
    }
    return route;
  });

}
