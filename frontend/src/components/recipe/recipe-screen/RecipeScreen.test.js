import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../Recipe';
import RecipeScreen from './RecipeScreen';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const recipePassed = new Recipe('', '', '', '', [], [], undefined, undefined, '', -1);
    const div = document.createElement('div');
    ReactDOM.render(<RecipeScreen location={{data: {recipe: recipePassed}}} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================