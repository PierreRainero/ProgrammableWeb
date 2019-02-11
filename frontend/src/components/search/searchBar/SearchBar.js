import React from 'react';

import './SearchBar.scss';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import history from '../../../history';

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
                <FormControl type='text' placeholder='Rechercher' className='mr-sm-2'
                    value={this.state.searchingValue} onChange={this.handleSearchingInputChange} />
                <Button className='btn-secondary' onClick={this.search}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Form>
        );
    }
}

export default SearchBar;