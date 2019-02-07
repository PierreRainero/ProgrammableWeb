import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import ProductScreen from './components/product/ProductScreen';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Home } />

        <Route exact={true} path='/product/:id' component={ ProductScreen } />
      </div>
    );
  }
}

export default App;
