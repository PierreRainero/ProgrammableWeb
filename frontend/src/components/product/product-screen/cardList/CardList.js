import React from 'react';

import './CardList.scss';
import {Card, ListGroup} from "react-bootstrap";

class CardList extends React.Component {
    render() {
        return (
            <Card className="shadow" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <ListGroup variant="flush">
                        {
                            this.props.data.map(item => {
                                return (
                                    <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default CardList;