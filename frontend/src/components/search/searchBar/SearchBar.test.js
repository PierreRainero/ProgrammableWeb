import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import history from '../../../history';
import SearchBar from './SearchBar';

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
    ReactDOM.render(<SearchBar />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks if the searching value update correctly
 */
it('Should update value to search', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<SearchBar />, div);

    expect(component.state.searchingValue).toEqual('');
    const inputNode  = component.refs['search-input'];
    const valueToSearch = 'tortellini';
    inputNode.value = valueToSearch;
    ReactTestUtils.Simulate.change(inputNode);
    expect(component.state.searchingValue).toEqual(valueToSearch);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks if the routing work correctly
 */
it('Should change call wanted search function', () => {
    const valueToSearch = 'tortellini';

    const div = document.createElement('div');
    const component = ReactDOM.render(<SearchBar
            history={ history }
            placeholder='Rechercher un produit'
            searchToDo={(stringPassed)=> {
                expect(stringPassed).toEqual(valueToSearch);
                history.push({
                    pathname: '/products',
                    data: { searchingValue: stringPassed }
                });
            }}
        />, div);

    const initialPath = component.props.history.location.pathname;
    expect(initialPath).toEqual('/');

    const inputNode  = component.refs['search-input'];
    inputNode.value = valueToSearch;
    ReactTestUtils.Simulate.change(inputNode);

    const buttonNode  = component.refs['search-submit'];
    ReactTestUtils.Simulate.click(buttonNode);

    const newPath = component.props.history.location.pathname;
    expect(newPath).toEqual('/products');
    const dataPassed = component.props.history.location.data.searchingValue;
    expect(dataPassed).toEqual(valueToSearch);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================