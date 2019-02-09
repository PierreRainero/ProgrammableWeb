import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import './NavigationBar.scss';

class NavigationBar extends React.Component {
    render() {
        return <Navbar className='primary-navBar'>
            <Link to='/'>
                <Navbar.Brand>
                    <img
                        alt='logo'
                        src={require('../../assets/imgs/logo.png')}
                        width='30'
                        height='30'
                        className='d-inline-block align-bottom'
                    />
                    <span className='primary-brand'>
                        React FrontEnd
                    </span>
                </Navbar.Brand>
            </Link>
        </Navbar>;
    }
}

export default NavigationBar;