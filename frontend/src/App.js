import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/NavigationBar';
import Home from './components/home/Home';
import ProductScreen from './components/product/product-screen/ProductScreen';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavigationBar />

        <Route exact path='/' component={ Home } />
        <Route exact={true} path='/products/:id' component={ ProductScreen } />
      </div>
    );
  }
}

export default App;
