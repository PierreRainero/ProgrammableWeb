import React from 'react';
import Loading from '../../loading/Loading';
import RecipeService from '../RecipeService';
import {Card, Col, Container, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import history from '../../../history';
import CardList from '../../cardList/CardList';
import CommentsCard from './commentsCard/CommentsCard';

import './RecipeScreen.scss';

/**
 * Component to fully present a recipe.
 */
class RecipeScreen extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            recipe: null,
            recipeImage: require('../../../assets/imgs/placeholder.png')
        }

        this.signalController = new AbortController()
    }


    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        if (this.props.location.data) {
            const recipe = this.props.location.data.recipe;
            if (recipe.img !== '') {
                this.setState({ loading: false, recipe: recipe, recipeImage: recipe.img });
            } else {
                this.setState({ loading: false, recipe: recipe });
            }

        } else {
            RecipeService.searchRecipeByCode(this.props.match.params.id).then(recipe => {
                if (recipe.img !== '') {
                    this.setState({ loading: false, recipe: recipe, recipeImage: recipe.img });
                } else {
                    this.setState({ loading: false, recipe: recipe });
                }
            }).catch(error => {
                console.log(error.message);
            });
        }
    }

    /**
     * Call when this component is destroyed
     */
    componentWillUnmount() {
        this.signalController.abort();
        this.mounted = false;
    }


    /**
     * Go to product page
     */
    goToProductPage = (item) => {
        history.push({
            pathname: `/products/${item.code}`
        });
    }

    /**
     * Render the component
     */
    render() {
        return (
            <div style={{ height: '100%' }}>
                {this.state.loading ?
                    <div>
                        <Loading />
                    </div>
                    :
                    <div style={{ height: '100%' }}>
                        <div className='recipeHeader'>
                            <img src='http://lorempixel.com/1920/250/food' alt='header' />
                        </div>
                        <div className='recipeGeneralInfos'>
                            <div className='recipeImage'>
                                <img
                                    src={this.state.recipeImage}
                                    alt={this.state.recipe.name}
                                    className={'shadow'}
                                />
                            </div>
                            <div className={`recipeName ${window.innerWidth > 576 ? 'textShadow' : ''}`}>
                                <div>{`Recette de ${this.state.recipe.name}`}</div>
                                <div className='recipeAuthor'>{`Proposée par ${this.state.recipe.author}`}</div>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                            Date de création
                                        </Tooltip>
                                    }
                                >
                                    <div className='recipeDate'>
                                        <FontAwesomeIcon icon={faClock} />
                                        <span> {this.state.recipe.createdAt}</span>
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <Container className='recipeDetails'>
                            <Row className='recipeDetailsRow'>
                                <Col md={4}>
                                    <Card className='shadow' style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Description</Card.Title>
                                            <p>{this.state.recipe.description}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <CardList title='Ingrédients' data={this.state.recipe.ingredients} actionOnClick={this.goToProductPage} />
                                </Col>
                                <Col md={4}>
                                    <CommentsCard title='Commentaires' data={this.state.recipe.comments} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

export default RecipeScreen;