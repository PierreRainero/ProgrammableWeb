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
     * Toggle the navbar onClick
     * @param {Event} e click event
     */
    toggle(event) {
        const navBackCollapseNode = document.getElementById('basic-navbar-nav');
        const buttonToggler = document.getElementById('basic-navbar-toggler');
        if (navBackCollapseNode.classList.contains('show')) {
            navBackCollapseNode.classList.remove('show');
            buttonToggler.classList.remove('collapsed');
        }else{
            buttonToggler.classList.add('collapsed');
            navBackCollapseNode.classList.add('show');
        }
    }

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
            <Navbar.Toggle id='basic-navbar-toggler' aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                <span className='separator-left'></span>
                <Link to='/products' ref='link-products' onClick={this.toggle}
                    className={`no-decoration nav-item primary-text-link ${history.location.pathname==='/products'? 'active': ''}`}>
                    <FontAwesomeIcon icon={faCookieBite} />
                    <span> Produits</span>
                </Link>
                <Link to='/recipes' ref='link-recipes' onClick={this.toggle}
                    className={`no-decoration nav-item primary-text-link ${history.location.pathname==='/recipes'? 'active': ''}`}>
                    <FontAwesomeIcon icon={faListAlt} />
                    <span> Recettes</span>
                </Link>
                <Link to='/stores' ref='link-stores' onClick={this.toggle}
                    className={`no-decoration nav-item primary-text-link ${history.location.pathname==='/stores'? 'active': ''}`}>
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