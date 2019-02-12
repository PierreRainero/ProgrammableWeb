import React from 'react';
import ReactDOM from 'react-dom';
import CardList from './CardList';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardList title='' data={[]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================