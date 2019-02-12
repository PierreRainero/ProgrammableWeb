import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import history from '../../history';

import './NavigationBar.scss';
import SearchBar from "../search/searchBar/SearchBar";

/**
 * Component to navigate easily between the different pages.
 */
class NavigationBar extends React.Component {

    /**
     * Render the component
     */
    render() {
        return <Navbar expand='lg' className='navBar-primary'>
            <Navbar.Brand>
                <Link to='/' className='no-decoration' ref='link-brand'>
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
                { history.location.pathname !== '/' ?
                    <SearchBar/>
                    : null
                }
            </Navbar.Collapse>
        </Navbar>;
    }
}

export default NavigationBar;