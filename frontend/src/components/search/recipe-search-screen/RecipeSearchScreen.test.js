import React from 'react';
import ReactDOM from 'react-dom';
import RecipeSearchScreen from './RecipeSearchScreen';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeSearchScreen location={{data: {searchingValue: ''}}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================