import React from 'react';
import ReactDOM from 'react-dom';
import CommentsCard from './CommentsCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CommentsCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================