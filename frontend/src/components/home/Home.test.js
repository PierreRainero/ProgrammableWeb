import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================