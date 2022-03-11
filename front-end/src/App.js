import './App.css';
import TaskApp from "./components/tasks/TaskApp";
import Auth from "./components/auth/Auth";
import { Typography, Pagination } from 'antd';

import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Title } = Typography;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth/>
        </Route>
        <Route path="/register">
          <></>
        </Route>
        <Route path="/">
          <TaskApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
