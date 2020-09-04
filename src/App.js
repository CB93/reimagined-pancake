import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';

const App = () => {
  return (
    <Router>
      <Nav />
    </Router>
  );
}

export default App;
