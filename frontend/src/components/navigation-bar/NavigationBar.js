import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faListAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import ProductsSearchBar from "../search/searchBar/ProductsSearchBar";
import history from '../../history';

import './NavigationBar.scss';


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
                <span className='separator-left'></span>
                <Link to='/products' ref='link-products'
                    className='no-decoration nav-item primary-text-link'>
                    <FontAwesomeIcon icon={faCookieBite} />
                    <span> Produits</span>
                </Link>
                <Link to='/recipes' ref='link-recipes'
                    className='no-decoration nav-item primary-text-link'>
                    <FontAwesomeIcon icon={faListAlt} />
                    <span> Recettes</span>
                </Link>
                <Link to='/stores' ref='link-stores'
                    className='no-decoration nav-item primary-text-link'>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                    <span> Magasins</span>
                </Link>
                </Nav>
                { history.location.pathname !== '/' ?
                    <ProductsSearchBar />
                    : null
                }
            </Navbar.Collapse>
        </Navbar>;
    }
}

export default NavigationBar;