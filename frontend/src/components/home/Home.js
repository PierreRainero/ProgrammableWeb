import React from 'react';

import './Home.scss';
import {Col, Container, Row} from "react-bootstrap";

class Home extends React.Component {
    render() {
        return (
            <div className="homeContent">
                <Container className="homeContainer">
                    <Row className="homeRow">
                        <Col md={6} className="homeCol">
                            <img src={require("../../assets/imgs/logo.png")} />
                            <p className="textShadow">Elfy est une application vous permettant de vous renseigner sur les aliments que vous achetez afin d'améliorer votre consommation.</p>
                        </Col>
                        <Col md={6} className="homeCol">
                            <h1 className="textShadow">Commencez dès maintenant !</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;