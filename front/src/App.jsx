import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './views/Login/index.jsx'
import Register from './views/Register/index.jsx'
import Home from './views/Home/index.jsx'
import Cart from './views/Cart/index.jsx'
import AddGoods from './views/AddGoods/index.jsx'
import Order from './views/Order/index.jsx'
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/addgoods",
    component: AddGoods,
  }, {
    path: "/order",
    component: Order,
  }
];
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route exact path="/" render={() =>
          <Redirect to='/login'></Redirect>}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
