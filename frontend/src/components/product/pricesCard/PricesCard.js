import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';

import './PricesCard.scss';
import NewPriceModal from '../newPriceModal/NewPriceModal';

/**
 * Component to present a list using cards.
 */
class PricesCard extends React.Component {

    state = {
        showNewPriceModal: false
    }

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
                            this.props.data.length > 0 ?
                                this.props.data.map((item, index) => {
                                    return (
                                        <ListGroup.Item key={index}>
                                            <Col md={9}>
                                                <h6>{item.store.id}</h6>
                                            </Col>
                                            <Col md={3} className='pricePart'>
                                                <p>{`${item.price} €`}</p>
                                            </Col>
                                        </ListGroup.Item>
                                    );
                                })
                                :
                                <p className='commentsEmpty'>Aucun prix n'a été renseigné pour ce produit.</p>
                        }
                    </ListGroup>
                    <Button variant='' className='button-secondary addButton' onClick={() => this.setState({ showNewPriceModal: true })}>Ajouter un prix</Button>
                </Card.Body>
                <NewPriceModal
                    show={this.state.showNewPriceModal}
                    onHide={() => this.setState({ showNewPriceModal: false })}
                    update={this.props.update}
                    product={this.props.product} />
            </Card>
        );
    }
}

PricesCard.defaultProps = {
    title: '',
    data: [],
    update: ()=>{}
};

PricesCard.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    update: PropTypes.func
};

export default PricesCard;