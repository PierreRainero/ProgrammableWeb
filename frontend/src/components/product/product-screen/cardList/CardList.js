import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

import './CardList.scss';

/**
 * Component to present a list using cards.
 */
class CardList extends React.Component {
    /**
     * Render the component
     */
    render() {
        return (
            <Card className='shadow' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <ListGroup variant='flush'>
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

CardList.defaultProps = {
    title: '',
    data: []
};

CardList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};


export default CardList;