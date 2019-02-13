import React from 'react';
import ReactDOM from 'react-dom';
import NoResult from './NoResult';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoResult />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================