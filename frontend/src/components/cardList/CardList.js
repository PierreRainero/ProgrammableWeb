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
                            this.props.data.map((item, index) => {
                                if(this.props.actionOnClick.length === 0){
                                    return (
                                        <ListGroup.Item key={index}>{item.name}</ListGroup.Item>
                                    );
                                }else{
                                    return (
                                        <ListGroup.Item
                                            key={index}
                                            className='clickable cardListHovering'
                                            onClick={() => {
                                                this.props.actionOnClick(item);
                                            }}
                                        >
                                            {item.name}
                                        </ListGroup.Item>
                                    );
                                }
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
    data: [],
    actionOnClick: ()=>{}
};

CardList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    actionOnClick: PropTypes.func
};


export default CardList;