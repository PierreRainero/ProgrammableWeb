import React from 'react';

import './Home.scss';
import {Col, Container, Image, Row} from "react-bootstrap";
import SearchBar from "../search/searchBar/SearchBar";

/**
 * Composent used as the home page of the application.
 * It role is to present the features and the main goal of the application.
 */
class Home extends React.Component {
    /**
     * Render the component
     */
    render() {
        return (
            <div className="homeContent">
                <Container className="homeContainer">
                    <Row className="homeRow">
                        <Col md={6} className="homeCol">
                            <Image src={require("../../assets/imgs/logo.png")} alt="logo" fluid/>
                            <p className="textShadow">Elfy est une application vous permettant de vous renseigner sur les aliments que vous achetez afin d'améliorer votre consommation.</p>
                        </Col>
                        <Col md={6} className="homeCol">
                            <h1 className="textShadow">Commencez dès maintenant !</h1>
                            <SearchBar/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;