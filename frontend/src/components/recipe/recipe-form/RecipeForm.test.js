import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Product from '../../product/Product';
import RecipeForm from './RecipeForm';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeForm />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks required elements
 */
it('Should not validated non valid form', () => {
    const div = document.createElement('div');
    const component  = ReactDOM.render(<RecipeForm />, div);

    expect(component.state.validated).toEqual(false);

    component.recipeToCreate.ingredients.push(new Product('1', 'product1', -1, '', -1, [], [], []));
    component.recipeToCreate.ingredients.push(new Product('2', 'product2', -1, '', -1, [], [], []));
    expect(component.state.validated).toEqual(false);

    const inputNameNode = ReactDOM.findDOMNode(component.refs['recipeForm-input-name']);
    const recipeName = 'Recipe name';
    inputNameNode.value = recipeName;
    ReactTestUtils.Simulate.change(inputNameNode);
    expect(component.state.recipeName).toEqual(recipeName);
    expect(component.state.validated).toEqual(false);

    const inputAuthorNode = ReactDOM.findDOMNode(component.refs['recipeForm-input-author']);
    const recipeAuthor = 'Me';
    inputAuthorNode.value = recipeAuthor;
    ReactTestUtils.Simulate.change(inputAuthorNode);
    expect(component.state.recipeAuthor).toEqual(recipeAuthor);
    expect(component.state.validated).toEqual(true);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================