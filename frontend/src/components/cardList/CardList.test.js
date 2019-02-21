import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import CardList from './CardList';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardList title='' data={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================


/**
 * Checks behaviours
 */
it('Should renders correct number of items', () => {
    const data = ['item1', 'item2', 'item3'];
    const div = document.createElement('div');
    const component = ReactDOM.render(<CardList title='' data={data} />, div);
    
    const httpCollectionOfListItem = ReactDOM.findDOMNode(component).getElementsByClassName('list-group-item');
    expect(httpCollectionOfListItem.length).toEqual(data.length);
    
    ReactDOM.unmountComponentAtNode(div);
});

it('Should triggers correct function', () => {
    const data = ['item1', 'item2', 'item3'];
    const div = document.createElement('div');
    const component = ReactDOM.render(<CardList title='' data={data}
        actionOnClick={(item)=> {
            expect(item).toEqual(data[1]);
        }}
    />, div);
    
    const httpCollectionOfListItem = ReactDOM.findDOMNode(component).getElementsByClassName('list-group-item');
    const item2Node = ReactDOM.findDOMNode(httpCollectionOfListItem[1]);
    ReactTestUtils.Simulate.click(item2Node);
    
    ReactDOM.unmountComponentAtNode(div);
});
 // =======================================