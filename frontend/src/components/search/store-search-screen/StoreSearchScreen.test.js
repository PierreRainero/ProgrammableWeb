import React from 'react';
import ReactDOM from 'react-dom';
import StoreSearchScreen from './StoreSearchScreen';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoreSearchScreen location={{data: {searchingValue: ''}}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================