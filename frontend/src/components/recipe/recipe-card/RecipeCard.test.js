import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../Recipe';
import RecipeCard from './RecipeCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const recipePassed = new Recipe('', '', '', [], [], undefined, undefined);
    const div = document.createElement('div');
    ReactDOM.render(<RecipeCard recipe={recipePassed}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================