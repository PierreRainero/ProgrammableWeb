import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import history from '../../history';

import ProductService from '../product/ProductService';

import './NavigationBar.scss';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchingValue: ''
        };

        this.handleSearchingInputChange = this.handleSearchingInputChange.bind(this);
    }

    handleSearchingInputChange= (event) => {
        this.setState({ searchingValue: event.target.value });
    }

    search= (event) => {
        ProductService.searchProductsByName(this.state.searchingValue, (data)=> {
            history.push({
                pathname: '/products',
                data: { products: data }
              })
        });
        event.preventDefault();
    }

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
                        React FrontEnd
                    </span>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
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

export default NavigationBar;