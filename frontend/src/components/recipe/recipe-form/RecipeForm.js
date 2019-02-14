import React from 'react';
import { Button, Collapse, Form, FormControl, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import ElfyPagination from '../../pagination/ElfyPagination';
import ProductService from '../../product/ProductService';
import RecipeService from '../RecipeService';
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
            show: false,
            recipeName: '',
            recipeAuthor: '',
            recipeImg: '',
            searchingValue: '',
            productsFound: [],
            numberOfProductsResults: 0,
            productPage: 1,
            productLoading: false,
            validated: false
        }

        this.itemsPerPage = 10;
        this.recipeToCreate = new Recipe('', '', '', '', [], [], undefined, undefined);

        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleRecipeAuthorChange = this.handleRecipeAuthorChange.bind(this);
        this.handleRecipeImgChange = this.handleRecipeImgChange.bind(this);
        this.handleSearchingInputChange = this.handleSearchingInputChange.bind(this);

        this.innerWidth = window.innerWidth;
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeNameChange = (event) => {
        this.recipeToCreate.name = event.target.value;
        this.setState({ recipeName: event.target.value });
        this.checkFormValidity();
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeAuthorChange = (event) => {
        this.recipeToCreate.author = event.target.value;
        this.setState({ recipeAuthor: event.target.value });
        this.checkFormValidity();
    }

    /**
     * Handles and updates the name of the recipe to create
     */
    handleRecipeImgChange = (event) => {
        this.recipeToCreate.img = event.target.value;
        this.setState({ recipeImg: event.target.value });
    }

    checkFormValidity = () => {
        if(this.state.recipeName!=='' && this.state.recipeAuthor!=='' && this.recipeToCreate.ingredients.length >= 2){
            this.setState({ validated: true });
        } else {
            this.setState({ validated: false });
        }
    }

    /**
     * Create the recipe
     */
    createRecipe = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        RecipeService.createARecipe(this.recipeToCreate, (result) => {
            if(result){
                this.recipeToCreate = new Recipe('', '', '', '', [], [], undefined, undefined);
                this.setState({ show: true, recipeName: '', recipeAuthor: '', recipeImg: '', open: false, validated: false });
            }
        });
        event.preventDefault();
    }

    /**
     * Handles and updates the name to use for searching products
     */
    handleSearchingInputChange = (event) => {
        this.setState({ searchingValue: event.target.value });
    }

    /**
     * Search products for given names
     */
    searchProduct = (event) => {
        this.setState({ productLoading: true });
        ProductService.getNumberOfProductsForName(this.state.searchingValue, (result) => {
            this.setState({ numberOfProductsResults: result });
        });
        ProductService.searchProductsByName(this.state.searchingValue, 1, this.itemsPerPage, (data) => {
            this.setState({ productsFound: data, productPage: 1, productLoading: false });
        });

        event.preventDefault();
    }

    /**
     * Handles a click on a checkox ingredient
     */
    handleChecked = (event, product) => {
        const elementIndex = this.recipeToCreate.ingredients.indexOf(product);
        if (elementIndex === -1) {
            this.recipeToCreate.ingredients.push(product);
        } else {
            this.recipeToCreate.ingredients.splice(elementIndex, 1);
        }
        this.checkFormValidity();
    }

    /**
     * Create a checkbox ingredient
     */
    createCheckboxIngredient = (product) => {
        return <Form.Check
            custom
            className='no-valid-decoration-input'
            type='checkbox'
            key={product.code}
            id={`checkbock-${product.code}`}
            label={product.name}
            onChange={(e) => this.handleChecked(e, product)}
        />;
    }

    /**
     * Build the UI zone dedicaced to the products result (for ingredients)
     */
    buildProductsZone = () => {
        let productsResultLeft = [];
        let productsResultRigth = [];
        if (this.state.productsFound.length > 0) {
            let i = 0;
            for (let product of this.state.productsFound) {
                if (i < this.itemsPerPage / 2) {
                    productsResultLeft.push(this.createCheckboxIngredient(product));
                } else {
                    productsResultRigth.push(this.createCheckboxIngredient(product));
                }
                i++;
            }
        }

        return <Row>
            <Col md>
                {productsResultLeft}
            </Col>
            <Col md>
                {productsResultRigth}
            </Col>
        </Row>;
    }

    /**
     * Change result page to display
     */
    changePage = (pageNumberToGo) => {
        if (pageNumberToGo === this.state.productPage) {
            return;
        }

        this.setState({ productLoading: true, productPage: pageNumberToGo });
        ProductService.searchProductsByName(this.state.searchingValue, pageNumberToGo, this.itemsPerPage, (data) => {
            this.setState({ productLoading: false, productsFound: data });
        });
    }

    /**
     * Fixs maximum of pages for the pagination according to the devices
     */
    getNumberOfMaximumPages = () => {
        if(this.innerWidth>=992){
            return 24;
        }else if(this.innerWidth>=768){
            return 14;
        }else{
            return 7;
        }
    }

    /**
     * Handle the closure of the information modal
     */
    handleClose = () => {
        this.setState({ show: false });
    }

    /**
     * Render the component
     */
    render() {
        const { open } = this.state;
        const collapsButtonValue = this.state.open ?
            <FontAwesomeIcon icon={faMinusCircle} /> :
            <FontAwesomeIcon icon={faPlusCircle} />;
        const numberOfIngredients = this.recipeToCreate.ingredients.length;
        let ingredientIndex = 0;

        let productsZone;
        let pagination;
        if(this.state.productLoading){
            productsZone = <img src={require('../../../assets/imgs/loading.gif')} alt='loading' className='loader' />;
        } else {
            productsZone = this.buildProductsZone();
        }
        if (this.state.numberOfProductsResults > 0) {
            pagination = <ElfyPagination
                activePage={this.state.productPage}
                numberOfElements={this.state.numberOfProductsResults}
                itemsPerPage={this.itemsPerPage}
                actionToDoOnPageClick={this.changePage}
                secondary={true}
                maximumPages={this.getNumberOfMaximumPages()}
            />;
        }

        return <div className='form-container text-left'>
            <Button
                onClick={() => this.setState({ open: !open })}
                className={`delay-top button-success ${this.state.open ? 'no-border-bottom' : ''}`}
                aria-controls='creation-recipe-form'
                aria-expanded={open}
            >
                {collapsButtonValue}<span> Créer une recette</span>
            </Button>
            <Collapse in={this.state.open}>
                <div id='creation-recipe-form'>
                    <Form className='text-left form-aerate form-zone'
                        noValidate
                        validated={this.state}
                        onSubmit={this.createRecipe}
                    >
                        <Form.Group controlId='formRecipeName' className='tight'>
                            <Form.Label>Nom de la recette</Form.Label>
                            <Form.Control type='text' placeholder='Nom de la recette'
                                value={this.state.recipeName} onChange={this.handleRecipeNameChange} required
                            />
                                <Form.Control.Feedback type="invalid">Veuillez entrer un nom pour votre recette.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='formRecipeImg' className='tight'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder="URL de l'image de la recette"
                                value={this.state.recipeImg} onChange={this.handleRecipeImgChange} />
                        </Form.Group>

                        <Form.Group controlId='formRecipeAuthor' className='tight'>
                            <Form.Label>Nom de l'auteur</Form.Label>
                            <Form.Control type='text' placeholder="Nom de l'auteur"
                                value={this.state.recipeAuthor} onChange={this.handleRecipeAuthorChange} required  
                            />
                            <Form.Control.Feedback type="invalid">Veuillez entrer un auteur pour votre recette.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='formRecipeIngredients' className='tight'>
                            <Form.Label>Ingrédients</Form.Label>
                            <div>
                                {this.recipeToCreate.ingredients.map(product => {
                                    let punctuation;
                                    if (numberOfIngredients === ingredientIndex + 1) {
                                        punctuation = '.'
                                    } else {
                                        punctuation = ','
                                    }
                                    ingredientIndex++;
                                    return <span key={product.code}>{product.name}{punctuation} </span>;
                                })}
                            </div>
                            <Row>
                                <Col xs={9}>
                                    <FormControl
                                        type='text'
                                        placeholder='Rechercher un ingrédient'
                                        className='no-valid-decoration-input'
                                        value={this.state.searchingValue}
                                        onChange={this.handleSearchingInputChange}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter') {
                                                this.searchProduct(e);
                                            }
                                        }}
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Button variant='' className='button-secondary' onClick={this.searchProduct} ref='search-submit'>
                                        <FontAwesomeIcon icon={faSearch} />
                                        <span className='hidden-md'> Rechercher des produits</span>
                                    </Button>
                                </Col>
                            </Row>
                            <div className={`${this.state.productLoading? 'text-center' : ''}`}>
                                <div style={{ marginTop: '0.5em' }}>
                                    {pagination}
                                </div>
                                {productsZone}
                            </div>
                        </Form.Group>

                        <div className='text-center'>
                            <Button variant='primary' type='submit'
                                className={`button-success ${!this.state.validated? 'disabled-cursor' : ''}`}
                                disabled={!this.state.validated}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} /><span> Envoyer</span>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Collapse>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Votre recette a été ajouté</Modal.Title>
                </Modal.Header>
                <Modal.Body>Toute l'équipe d'Elfy vous remercie pour votre contribution !</Modal.Body>
            </Modal>
        </div>;
    }
}

export default RecipeForm;