import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom'
import './App.css';
import Home from './Home/Home';
import Character from './Character/Character';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/:characterId" component={Character}/>
      </Switch>
    </div>
  </Router>
);

export default App