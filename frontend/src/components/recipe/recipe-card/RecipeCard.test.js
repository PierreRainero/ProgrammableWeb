import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../Recipe';
import RecipeCard from './RecipeCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const recipePassed = new Recipe('', '', '', '', [], [], undefined, undefined, '');
    const div = document.createElement('div');
    ReactDOM.render(<RecipeCard recipe={recipePassed} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Check the image used
 */
it('Should not used empty img url', () => {
    const recipePassed = new Recipe('', '', '', '', [], [], undefined, undefined, '');
    const div = document.createElement('div');
    const component = ReactDOM.render(<RecipeCard recipe={recipePassed} />, div);

    const placeHolder = 'placeholder.png';
    expect(component.recipeImg).toEqual(placeHolder);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should used given img url', () => {
    const givenImgUrl = 'http://monespace.fr/monimage.jpg';
    const recipePassed = new Recipe('', '', '', givenImgUrl, [], [], undefined, undefined, '');
    const div = document.createElement('div');
    const component = ReactDOM.render(<RecipeCard recipe={recipePassed} />, div);

    const placeHolder = 'placeholder.png';
    expect(component.recipeImg===placeHolder).toEqual(false);
    expect(component.recipeImg).toEqual(givenImgUrl);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================