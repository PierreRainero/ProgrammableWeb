import React from 'react';
import ReactDOM from 'react-dom';
import history from '../../history';
import { Router, Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import ReactTestUtils from 'react-dom/test-utils';

afterEach(cleanUp);

/**
 * Clean-up history between each test
 */
function cleanUp(){
    if(history.location.pathname !== '/'){
        history.replace('/');
    }
}

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router history={ history }><NavigationBar/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks if the navigation works correctly
 */
it('Should go to home page', () => {
    const div = document.createElement('div');
    window.searchRoot = ReactDOM.render(<Router history={ history }><NavigationBar /></Router>, div);
    const allComponentAsArray = ReactTestUtils.findAllInRenderedTree(window.searchRoot, function() { return true; });
    expect(allComponentAsArray.length > 1).toEqual(true);
    const component  = allComponentAsArray[1];
    expect(component!==undefined).toEqual(true);


    const brandLink = component.refs['link-brand'];
    expect(brandLink.props.to).toEqual('/');

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================