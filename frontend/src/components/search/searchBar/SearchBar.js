import React from 'react';

import { Button, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import history from '../../../history';

import './SearchBar.scss';

/**
 * Composent used to search products.
 */
class SearchBar extends React.Component {

    state = {
        searchingValue: ''
    }

    constructor(props) {
        super(props);

        this.handleSearchingInputChange = this.handleSearchingInputChange.bind(this);
    }

    /**
     * Handle and update the name to use for searching products
     */
    handleSearchingInputChange = (event) => {
        this.setState({ searchingValue: event.target.value });
    }

    /**
     * Navigate to the result view of the search
     */
    search = (event) => {
        history.push({
            pathname: '/products',
            data: { searchingValue: this.state.searchingValue }
        });

        event.preventDefault();
    }

    /**
     * Render the component
     */
    render() {
        return (
            <Form inline>
                <FormControl type='text' placeholder='Rechercher' className='searchInput'
                    value={this.state.searchingValue} onChange={this.handleSearchingInputChange} />
                <Button variant='' className='button-secondary searchButton' onClick={this.search}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Form>
        );
    }
}

export default SearchBar;