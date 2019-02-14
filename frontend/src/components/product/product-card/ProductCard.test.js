import React from 'react';
import ReactDOM from 'react-dom';
import Product from '../Product';
import ProductCard from './ProductCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const productPassed = new Product('', '', -1, '', -1, [], [], []);
    productPassed.addImg('fictiveURLImage');
    const div = document.createElement('div');
    ReactDOM.render(<ProductCard product={productPassed}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Check the image used
 */
it('Should used given img url', () => {
    const givenImgUrl = 'http://monespace.fr/monimage.jpg';
    const productPassed = new Product('', '', -1, '', -1, [], [], []);
    productPassed.addImg(givenImgUrl);
    const div = document.createElement('div');
    const component = ReactDOM.render(<ProductCard product={productPassed}/>, div);

    const placeHolder = 'placeholder.png';
    expect(component.props.product.img===placeHolder).toEqual(false);
    expect(component.props.product.img).toEqual(givenImgUrl);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================