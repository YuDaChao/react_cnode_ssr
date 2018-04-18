import React from 'react'
import {
  Route,
} from 'react-router-dom'
import Home from '../views/home/index.jsx'
const RouteMap = () => (
  [
    <Route exact key="index" path="/" component={Home} />,
    <Route exact key="user" path="/user" render={() => <div>User</div>} />
  ]
);
export default RouteMap
