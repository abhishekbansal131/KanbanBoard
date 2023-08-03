import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Error from './Components/Error/Error';
import Protected from './Components/Protected/Protected'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' > <Protected Component = {App}></Protected> </Route>
        <Route path='/signup' > <SignUp></SignUp> </Route>
        <Route path='/login' > <Login /> </Route>
        <Route path='*'> <Error></Error> </Route>
      </Switch>
    </BrowserRouter>

  </React.StrictMode>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
