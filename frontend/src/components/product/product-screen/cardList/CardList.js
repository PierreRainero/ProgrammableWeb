import React from 'react';

import './CardList.scss';
import {Card, ListGroup} from "react-bootstrap";

/**
 * Component to present a list using cards.
 */
class CardList extends React.Component {
    /**
     * Render the component
     */
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