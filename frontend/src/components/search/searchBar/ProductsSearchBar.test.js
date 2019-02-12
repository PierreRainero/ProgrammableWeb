import React from 'react';
import ReactDOM from 'react-dom';
import ProductsSearchBar from './ProductsSearchBar';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductsSearchBar />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================