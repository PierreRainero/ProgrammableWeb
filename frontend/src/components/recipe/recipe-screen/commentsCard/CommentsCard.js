import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col, Form, FormControl, ListGroup, Row} from 'react-bootstrap';

import './CommentsCard.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import RecipeService from "../../RecipeService";

/**
 * Component to present a list using cards.
 */
class CommentsCard extends React.Component {

    state={
        name: "",
        comment: ""
    }
    comment = this.comment.bind(this);

    comment(){
        RecipeService.addComment(this.props.recipe.id, this.state.name, this.state.comment)
            .then(() => {
                this.setState({name: "", comment: ""});
                this.props.update();
            })
            .catch(err => console.error(err.message));
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
                            placeholder='Nom'
                            className='nameInput'
                            ref='name-input'
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}
                        />
                        <FormControl
                            type='text'
                            placeholder='Commentaire'
                            className='commentInput'
                            ref='comment-input'
                            value={this.state.comment}
                            onChange={e => this.setState({comment: e.target.value})}
                        />
                        <Button variant='' className='button-secondary addButton' onClick={this.comment} ref='comment-submit'>
                            Ajouter le commentaire
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