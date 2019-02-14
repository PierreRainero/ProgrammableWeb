import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        this.props.searchToDo(this.state.searchingValue);
        event.preventDefault();
    }

    /**
     * Render the component
     */
    render() {
        return (
            <Form inline>
                <FormControl
                    type='text'
                    placeholder={this.props.placeholder}
                    className='searchInput'
                    ref='search-input'
                    value={this.state.searchingValue}
                    onChange={this.handleSearchingInputChange}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            this.search(e);
                        }
                    }}
                />
                <Button variant='' className='button-secondary searchButton' onClick={this.search} ref='search-submit'>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Form>
        );
    }
}

SearchBar.defaultProps = {
    placeholder: '',
    searchToDo: ()=>{}
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    searchToDo: PropTypes.func
};

export default SearchBar;