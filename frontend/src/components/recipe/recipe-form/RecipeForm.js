import React from 'react';
import { Button, Collapse, Form, FormControl, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import Recipe from '../Recipe';

import './RecipeForm.scss';


/**
 * Component to create a recipe.
 */
class RecipeForm extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            recipeName: '',
            recipeAuthor: '',
            recipeImg: ''
        }

        this.recipeToCreate = new Recipe('', '', '', '', [], [], undefined, undefined);

        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleRecipeAuthorChange = this.handleRecipeAuthorChange.bind(this);
        this.handleRecipeImgChange = this.handleRecipeImgChange.bind(this);
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeNameChange = (event) => {
        this.recipeToCreate.name = event.target.value;
        this.setState({ recipeName: event.target.value });
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeAuthorChange = (event) => {
        this.recipeToCreate.author = event.target.value;
        this.setState({ recipeAuthor: event.target.value });
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeImgChange = (event) => {
        this.recipeToCreate.img = event.target.value;
        this.setState({ recipeImg: event.target.value });   
    }

    /**
     * Create the recipe
     */
    createRecipe = (event) => {
        console.log(this.recipeToCreate);
        event.preventDefault();
    }

    /**
     * Render the component
     */
    render() {
        const { open } = this.state;
        const collapsButtonValue = this.state.open?
            <><FontAwesomeIcon icon={faMinusCircle} /><span> Créer une recette</span></>:
            <><FontAwesomeIcon icon={faPlusCircle} /><span> Créer une recette</span></>;
        const numberOfIngredients = this.recipeToCreate.ingredients.length;
        let ingredientIndex = 0;

        return <div className='form-container text-left'>
            <Button
                    onClick={() => this.setState({ open: !open })}
                    className={`delay-top button-success ${this.state.open? 'no-border-bottom' : ''}`}
                    aria-controls='creation-recipe-form'
                    aria-expanded={open}
                >
                    {collapsButtonValue}
                </Button>
                <Collapse in={this.state.open}>
                    <div id='creation-recipe-form'>
                        <Form className='text-left form-aerate form-zone'>
                            <Form.Group controlId='formRecipeName' className='tight'>
                                <Form.Label>Nom de la recette</Form.Label>
                                <Form.Control type='text' placeholder='Nom de la recette'
                                    value={this.state.recipeName} onChange={this.handleRecipeNameChange} />
                            </Form.Group>

                            <Form.Group controlId='formRecipeImg' className='tight'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder="URL de l'image de la recette"
                                    value={this.state.recipeImg} onChange={this.handleRecipeImgChange} />
                            </Form.Group>

                            <Form.Group controlId='formRecipeAuthor' className='tight'>
                                <Form.Label>Nom de l'auteur</Form.Label>
                                <Form.Control type='text' placeholder="Nom de l'auteur"
                                    value={this.state.recipeAuthor} onChange={this.handleRecipeAuthorChange} />
                            </Form.Group>

                            <Form.Group controlId='formRecipeIngredients' className='tight'>
                                <Form.Label>Ingrédients</Form.Label>
                                {this.recipeToCreate.ingredients.map(product => {
                                    let punctuation;
                                    if(numberOfIngredients === ingredientIndex + 1){
                                        punctuation = '.'
                                    }else{
                                        punctuation = ','
                                    }
                                    ingredientIndex++;
                                    return <span key={product.code}>{product.name}{punctuation} </span>;
                                })}
                                <Row>
                                    <Col xs={9}>
                                        <FormControl 
                                            type='text'
                                            placeholder='Rechercher un ingrédient'
                                            value={this.state.searchingValue}
                                            onChange={this.handleSearchingInputChange}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter') {
                                                    this.search(e);
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <Button variant='' className='button-secondary' onClick={this.search} ref='search-submit'>
                                            <FontAwesomeIcon icon={faSearch} />
                                            <span className='hidden-md'> Rechercher des produits</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <div className='text-center'>
                                <Button variant='primary' type='submit' className='button-success'
                                    onClick={this.createRecipe} >
                                    <FontAwesomeIcon icon={faPaperPlane} /><span> Envoyer</span>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Collapse>
        </div>;
    }
}

export default RecipeForm;