import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComments } from '@fortawesome/free-solid-svg-icons';
import Recipe from '../Recipe';

import './RecipeCard.scss';

/**
 * Component to quickly present a recipe.
 */
class RecipeCard extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.recipe = props.recipe;
        this.recipeImg = this.recipe.img===''? require('../../../assets/imgs/placeholder.png') : this.recipe.img;
    }

    /**
     * Render the component
     */
    render() {
        const numberOfIngredients = this.recipe.ingredients.length;
        let ingredientIndex = 0;
        return <Card className='recipe-card-container clickable shadow'>
            <Card.Body className='recipe-card-content'>
                <div className='row'>
                    <div className='col-md-3 col-lg-2'>
                        <img
                            alt='product_img'
                            src={this.recipeImg}
                            className='d-inline-block align-bottom productImg'
                        />
                    </div>
                    <div className='col-md-9 col-lg-10 card-text-zone'>
                        <Card.Title>{this.recipe.name}</Card.Title>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Date de création
                                </Tooltip>
                            }
                        >
                            <div className='secondary-informations definition'>
                                <FontAwesomeIcon icon={faClock} />
                                <span> {this.recipe.createdAt}</span>
                            </div>
                        </OverlayTrigger>
                        <span className='separator'></span>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Nombre des commentaires
                                </Tooltip>
                            }
                        >
                            <div className='secondary-informations definition'>
                                <FontAwesomeIcon icon={faComments} />
                                <span> {this.recipe.comments.length}</span>
                            </div>
                        </OverlayTrigger>
                        <div className='text-left ingredients-zone'>
                            <span className='h6'>Ingrédients : </span>
                            {this.recipe.ingredients.map(product => {
                                let punctuation;
                                if(numberOfIngredients === ingredientIndex + 1){
                                    punctuation = '.'
                                }else{
                                    punctuation = ','
                                }
                                ingredientIndex++;
                                return <span key={product.code}><Link to={`/products/${product.code}`}>{product.name}</Link>{punctuation} </span>;
                            })}
                        </div>
                    </div>
                </div>
            </Card.Body> 
        </Card>;
    }
}

RecipeCard.defaultProps = {
    recipe: new Recipe('', '', '', '', [], [], undefined, undefined, '')
};

RecipeCard.propTypes = {
    recipe: PropTypes.object
};

export default RecipeCard;