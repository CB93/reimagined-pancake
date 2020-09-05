import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';import Nav from './components/nav/nav.component'
import HomePage from './pages/homepage/homepage.component';

import './App.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
