import React from 'react';
import ReactDOM from 'react-dom';
import PricesCard from './PricesCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PricesCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================