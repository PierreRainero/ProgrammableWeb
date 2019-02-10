import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import history from '../../history';

import './NavigationBar.scss';

/**
 * Component to navigate easily between the different pages.
 */
class NavigationBar extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            searchingValue: ''
        };

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
        return <Navbar expand='lg' className='navBar-primary'>
            <Navbar.Brand>
                <Link to='/' className='no-decoration'>
                    <img
                        alt='logo'
                        src={require('../../assets/imgs/logo.png')}
                        width='30'
                        height='30'
                        className='d-inline-block align-bottom'
                    />
                    <span className='brand-primary'>
                        Elfy
                    </span>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                </Nav>
                <Form inline>
                    <FormControl type='text' placeholder='Rechercher' className='mr-sm-2'
                        value={this.state.searchingValue} onChange={this.handleSearchingInputChange} />
                    <Button className='btn-secondary' onClick={this.search}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>;
    }
}

export default withRouter(NavigationBar);