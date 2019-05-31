import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './component/Main';
import Create from './component/Create';
import Edit from './component/Edit';
import Show from './component/Show';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path ="/" component={Main} />
        <Route exact path ="/create" component={Create} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/show/:id' component={Show} />
      </Router>
    </div>
  );
}

export default App;
