import React from 'react';
import ReactDOM from 'react-dom';
import ProductSearchScreen from './ProductSearchScreen';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductSearchScreen location={{data: {searchingValue: ''}}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================