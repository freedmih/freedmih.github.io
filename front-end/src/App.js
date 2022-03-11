import './App.css';
import TaskApp from "./components/tasks/TaskApp";
import Auth from "./components/auth/Auth";
import Register from "./components/auth/Register";
import { Typography, Pagination } from 'antd';
import { useHistory } from "react-router-dom";
import React, { useEffect } from 'react';

import API from './api/api';

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
          <Register></Register>
        </Route>
        <Route path="/">
          <TaskApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
