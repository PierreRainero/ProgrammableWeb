import React from 'react';
import ReactDOM from 'react-dom';
import Product from '../Product';
import ProductCard from './ProductCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const productPassed = new Product(-1, '', -1, '', -1, [], [], []);
    productPassed.addImg('fictiveURLImage');
    const div = document.createElement('div');
    ReactDOM.render(<ProductCard product={productPassed}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================