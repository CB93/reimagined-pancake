import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import HomePage from './pages/homepage/homepage.component';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.styles.scss';

const App = () => {

  return (
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
