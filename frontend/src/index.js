import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {authProvider} from './components/LoginForm';
import LoginForm from './components/LoginForm';
import { authContext } from './components/LoginForm';
import { userAuth } from './components/LoginForm';
import { notificatoinContext } from './components/AddExpenseForm';
import { notiifcationCountNumber } from './components/AddExpenseForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <authContext.Provider value={userAuth}>
      <notificatoinContext.Provider value={notiifcationCountNumber}>
        <App/>
      </notificatoinContext.Provider>
    </authContext.Provider>    
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//serviceWorker.unregister();
reportWebVitals();
