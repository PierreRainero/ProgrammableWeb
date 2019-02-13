import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

import './ElfyPagination.scss';

/**
 * Component to creates and interacts with multiple pages element.
 */
class ElfyPagination extends React.Component {
    /**
     * Executes the action when a number is clicked
     */
    clickOnPage = (event, pageNumberClicked) => {
        this.props.actionToDoOnPageClick(pageNumberClicked);
        event.preventDefault();
    }

    /**
     * Create a pagination item
     */
    createPaginationItem = (index) => {
        return <Pagination.Item key={index}
            active={index === this.props.activePage}
            onClick={(e) => this.clickOnPage(e, index)}>
            {index}
        </Pagination.Item>;
    }

    /**
     * Return the maximum page of results
     * @return {number} maximum page according to the number of elements and the number of elements by page
     */
    getMaximumPage = () => {
        return Math.ceil(this.props.numberOfElements / this.props.itemsPerPage);
    }

    /**
     * Render the component
     */
    render() {
        let pagination;
        if (this.props.numberOfElements > 0) {
            let paginationContent = [];
            let pageNumber = 1;
            for (let elementsCounted = 0;
                elementsCounted < this.props.numberOfElements;
                elementsCounted = elementsCounted + this.props.itemsPerPage) {
                paginationContent.push(this.createPaginationItem(pageNumber));
                pageNumber++;
            }
            pagination = <Pagination>
                <Pagination.First onClick={(e) => this.clickOnPage(e, 1)} />
                <Pagination.Prev onClick={(e) => this.clickOnPage(e, this.props.activePage - 1)} disabled={this.props.activePage === 1} />
                {paginationContent}
                <Pagination.Next onClick={(e) => this.clickOnPage(e, this.props.activePage + 1)} disabled={this.props.activePage === this.getMaximumPage()} />
                <Pagination.Last onClick={(e) => this.clickOnPage(e, this.getMaximumPage())} />
            </Pagination>;
        }
        return (
            <div>
                <div className='center'>
                    {pagination}
                </div>
            </div>
        );
    }

}

ElfyPagination.defaultProps = {
    activePage: 1,
    numberOfElements: 0,
    itemsPerPage: 20,
    actionToDoOnPageClick: ()=>{}
};

ElfyPagination.propTypes = {
    activePage: PropTypes.number,
    numberOfElements: PropTypes.number,
    itemsPerPage: PropTypes.number,
    actionToDoOnPageClick: PropTypes.func
};

export default ElfyPagination;