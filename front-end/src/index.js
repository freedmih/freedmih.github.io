import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppContext, AppSettings } from "./Context"; 

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={AppSettings}>
    <App />
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
