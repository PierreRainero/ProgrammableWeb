import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { Router } from 'react-router-dom';
import App from './App';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router history={ history }><App /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
// =======================================
