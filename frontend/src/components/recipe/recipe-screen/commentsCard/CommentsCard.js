import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col, Form, FormControl, ListGroup, Row} from 'react-bootstrap';

import './CommentsCard.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faPlus} from "@fortawesome/free-solid-svg-icons";

/**
 * Component to present a list using cards.
 */
class CommentsCard extends React.Component {
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
                                            <Row>
                                                <Col md={6}>
                                                    <h6>{`${item.author}:`}</h6>
                                                </Col>
                                                <Col md={6} className='commentDate'>
                                                    <FontAwesomeIcon icon={faClock} className='commentDateIcon'/>
                                                    <span className='commentDateText'> {item.createdAt}</span>
                                                </Col>
                                            </Row>
                                            <p className='commentBody'>{item.body}</p>
                                        </ListGroup.Item>
                                    );
                                })
                                :
                                <p className='commentsEmpty'>Aucun commentaire n'a été fait sur cette recette</p>
                        }
                    </ListGroup>
                    <h5>Ajouter un commentaire :</h5>
                    <Form inline>
                        <FormControl
                            type='text'
                            placeholder=''
                            className='commentInput'
                            ref='comment-input'
                            value={''}
                            onChange={e => console.log(e)}
                        />
                        <Button variant='' className='button-secondary addButton' onClick={this.search} ref='comment-submit'>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

CommentsCard.defaultProps = {
    title: '',
    data: []
};

CommentsCard.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};


export default CommentsCard;