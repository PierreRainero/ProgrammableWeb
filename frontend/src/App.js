import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/NavigationBar';
import Home from './components/home/Home';
import SearchScreen from './components/search/SearchScreen';
import ProductScreen from './components/product/product-screen/ProductScreen';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavigationBar />
        <div className='AppContent'>
            <Route exact path='/' component={ Home } />
            <Route exact={true} path='/products' component={ SearchScreen } />
            <Route exact={true} path='/products/:id' component={ ProductScreen } />
        </div>
      </div>
    );
  }
}

export default App;
