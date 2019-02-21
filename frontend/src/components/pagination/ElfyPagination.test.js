import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ElfyPagination from './ElfyPagination';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElfyPagination/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks behaviours
 */
it('Should creates correct number of items', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={1}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {}}
    />, div);

    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    expect(httpCollectionsOFPages.length).toEqual(3+4);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should creates correct number of items with custom limit', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={1}
        numberOfElements={60}
        itemsPerPage={10}
        actionToDoOnPageClick={(pageClicked)=> {}}
        maximumPages={15}
    />, div);

    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    expect(httpCollectionsOFPages.length).toEqual(6+4);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should send correct page clicked', () => {
    const wantedPage = 2;
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={1}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {
            expect(pageClicked).toEqual(wantedPage);
        }}
    />, div);

    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    const itemNode = httpCollectionsOFPages[1+2];
    const htmlAElementsInsideNode = ReactDOM.findDOMNode(itemNode).getElementsByTagName('a');
    expect(htmlAElementsInsideNode.length).toEqual(1);
    const clickableElement = htmlAElementsInsideNode[0];

    ReactTestUtils.Simulate.click(clickableElement);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should send previous page', () => {
    const wantedPage = 1;
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={2}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {
            expect(pageClicked).toEqual(wantedPage);
        }}
    />, div);
    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    const itemNode = httpCollectionsOFPages[0+1];
    const htmlAElementsInsideNode = ReactDOM.findDOMNode(itemNode).getElementsByTagName('a');
    expect(htmlAElementsInsideNode.length).toEqual(1);
    const clickableElement = htmlAElementsInsideNode[0];

    ReactTestUtils.Simulate.click(clickableElement);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should send next page', () => {
    const wantedPage = 3;
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={2}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {
            expect(pageClicked).toEqual(wantedPage);
        }}
    />, div);
    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    const itemNode = httpCollectionsOFPages[3+2];
    const htmlAElementsInsideNode = ReactDOM.findDOMNode(itemNode).getElementsByTagName('a');
    expect(htmlAElementsInsideNode.length).toEqual(1);
    const clickableElement = htmlAElementsInsideNode[0];

    ReactTestUtils.Simulate.click(clickableElement);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should send first page', () => {
    const wantedPage = 1;
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={3}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {
            expect(pageClicked).toEqual(wantedPage);
        }}
    />, div);
    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    const itemNode = httpCollectionsOFPages[0+0];
    const htmlAElementsInsideNode = ReactDOM.findDOMNode(itemNode).getElementsByTagName('a');
    expect(htmlAElementsInsideNode.length).toEqual(1);
    const clickableElement = htmlAElementsInsideNode[0];

    ReactTestUtils.Simulate.click(clickableElement);

    ReactDOM.unmountComponentAtNode(div);
});

it('Should send last page', () => {
    const wantedPage = 3;
    const div = document.createElement('div');
    const component = ReactDOM.render(<ElfyPagination
        activePage={2}
        numberOfElements={60}
        itemsPerPage={20}
        actionToDoOnPageClick={(pageClicked)=> {
            expect(pageClicked).toEqual(wantedPage);
        }}
    />, div);
    const httpCollectionsOFPages = ReactDOM.findDOMNode(component).getElementsByClassName('page-item');
    const itemNode = httpCollectionsOFPages[3+3];
    const htmlAElementsInsideNode = ReactDOM.findDOMNode(itemNode).getElementsByTagName('a');
    expect(htmlAElementsInsideNode.length).toEqual(1);
    const clickableElement = htmlAElementsInsideNode[0];

    ReactTestUtils.Simulate.click(clickableElement);

    ReactDOM.unmountComponentAtNode(div);
});
// =======================================

