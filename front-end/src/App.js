import './App.css';
import TaskApp from "./components/tasks/TaskApp";
import Auth from "./components/auth/Auth";
import Register from "./components/auth/Register";
import { Typography, Pagination } from 'antd';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LanguageDropdown from './components/languageDropdown';

import useLogin from "./hooks/useLogin";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useTranslation } from 'react-i18next';


const { Title } = Typography;

function App() {

  const [isAuth, setAuth] = useLogin(false);
  const {t} = useTranslation();

  return (
    <Router>
      <LanguageDropdown/>
      <Switch>
        <Route path="/auth">
          <Auth isAuth={isAuth} setAuth={setAuth} />
        </Route>
        <Route path="/register">
          <Register isAuth={isAuth} setAuth={setAuth}></Register>
        </Route>
        <Route exact path="/">
          <TaskApp isAuth={isAuth} setAuth={setAuth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
