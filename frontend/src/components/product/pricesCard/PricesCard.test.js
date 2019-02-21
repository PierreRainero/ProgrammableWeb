import React from 'react';
import ReactDOM from 'react-dom';
import PricesCard from './PricesCard';
import Product from "../Product";

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PricesCard product={new Product("", "", "", "", "", "", "", "")}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================