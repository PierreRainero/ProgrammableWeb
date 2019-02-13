import React from 'react';
import Loading from '../../loading/Loading';
import RecipeService from '../RecipeService';

import './RecipeScreen.scss';
import {Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import CardList from "../../cardList/CardList";
import CommentsCard from "./commentsCard/CommentsCard";

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
            recipe: null
        }

        this.signalController = new AbortController()
    }


    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        if (this.props.location.data) {
            this.setState({loading: false, recipe: this.props.location.data.recipe});
        } else {
            RecipeService.searchRecipeByCode(this.props.match.params.id).then(recipe => {
                this.setState({loading: false, recipe: recipe});
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
     * Render the component
     */
    render() {
        console.log(this.state.recipe);
        return (
            <div style={{height: '100%'}}>
                {this.state.loading ?
                    <div>
                        <Loading/>
                    </div>
                    :
                    <div style={{height: '100%'}}>
                        <div className='recipeHeader'>
                            <img src='http://lorempixel.com/1920/250/food' alt='header'/>
                        </div>
                        <div className='recipeGeneralInfos'>
                            <div className='recipeImage'>
                                <img
                                    src={this.state.recipe.img}
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
                                        <FontAwesomeIcon icon={faClock}/>
                                        <span> {this.state.recipe.createdAt}</span>
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <Container className='recipeDetails'>
                            <Row className='recipeDetailsRow'>
                                <Col md={6}>
                                    <CardList title='Ingrédients' data={this.state.recipe.ingredients} />
                                </Col>
                                <Col md={6}>
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