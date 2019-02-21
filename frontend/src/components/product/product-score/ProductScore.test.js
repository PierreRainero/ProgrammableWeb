import React from 'react';
import ReactDOM from 'react-dom';
import ProductScore from './ProductScore';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductScore score={100} nutrigrade={'A'} novaGroup={1}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks if the style are corresponding to the quality of the product
 */
it('Should use styles class for good product', () => {
    const nutriValue = 'A';
    const div = document.createElement('div');
    const component = ReactDOM.render(<ProductScore score={100} nutrigrade={nutriValue} novaGroup={1}/>, div);

    const goodStyle = ReactDOM.findDOMNode(component).getElementsByClassName('good-score');
    const mediumStyle = ReactDOM.findDOMNode(component).getElementsByClassName('medium-score');
    const badStyle = ReactDOM.findDOMNode(component).getElementsByClassName('bad-score');

    expect(goodStyle.length).toEqual(1);
    expect(mediumStyle.length).toEqual(0);
    expect(badStyle.length).toEqual(0);

    const nutriStyle = ReactDOM.findDOMNode(component).getElementsByClassName(`${nutriValue.toLowerCase()}-value`);
    expect(nutriStyle.length).toEqual(2);
    ReactDOM.unmountComponentAtNode(div);
});

it('Should use styles class for medium product', () => {
    const nutriValue = 'C';
    const div = document.createElement('div');
    const component = ReactDOM.render(<ProductScore score={69} nutrigrade={nutriValue} novaGroup={1}/>, div);

    const goodStyle = ReactDOM.findDOMNode(component).getElementsByClassName('good-score');
    const mediumStyle = ReactDOM.findDOMNode(component).getElementsByClassName('medium-score');
    const badStyle = ReactDOM.findDOMNode(component).getElementsByClassName('bad-score');

    expect(goodStyle.length).toEqual(0);
    expect(mediumStyle.length).toEqual(1);
    expect(badStyle.length).toEqual(0);

    const nutriStyle = ReactDOM.findDOMNode(component).getElementsByClassName(`${nutriValue.toLowerCase()}-value`);
    expect(nutriStyle.length).toEqual(1);
    ReactDOM.unmountComponentAtNode(div);
});

it('Should use styles class for bad product', () => {
    const nutriValue = 'E';
    const div = document.createElement('div');
    const component = ReactDOM.render(<ProductScore score={30} nutrigrade={nutriValue} novaGroup={4}/>, div);

    const goodStyle = ReactDOM.findDOMNode(component).getElementsByClassName('good-score');
    const mediumStyle = ReactDOM.findDOMNode(component).getElementsByClassName('medium-score');
    const badStyle = ReactDOM.findDOMNode(component).getElementsByClassName('bad-score');

    expect(goodStyle.length).toEqual(0);
    expect(mediumStyle.length).toEqual(0);
    expect(badStyle.length).toEqual(1);

    const nutriStyle = ReactDOM.findDOMNode(component).getElementsByClassName(`${nutriValue.toLowerCase()}-value`);
    expect(nutriStyle.length).toEqual(2);
    ReactDOM.unmountComponentAtNode(div);
});

it('Should use styles class for not specified product', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<ProductScore/>, div);

    const goodStyle = ReactDOM.findDOMNode(component).getElementsByClassName('good-score');
    const mediumStyle = ReactDOM.findDOMNode(component).getElementsByClassName('medium-score');
    const badStyle = ReactDOM.findDOMNode(component).getElementsByClassName('bad-score');

    expect(goodStyle.length).toEqual(0);
    expect(mediumStyle.length).toEqual(0);
    expect(badStyle.length).toEqual(1);

    const nutriStyle = ReactDOM.findDOMNode(component).getElementsByClassName('default-value');
    expect(nutriStyle.length).toEqual(2);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================