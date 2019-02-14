import React from 'react';
import Loading from '../../loading/Loading';
import NoResult from '../no-result/NoResult';
import SearchBar from '../searchBar/SearchBar';
import RecipeCard from '../../recipe/recipe-card/RecipeCard';
import ElfyPagination from '../../pagination/ElfyPagination';
import RecipeForm from '../../recipe/recipe-form/RecipeForm';
import RecipeService from '../../recipe/RecipeService';
import history from '../../../history';

import './RecipeSearchScreen.scss';

/**
 * Component to present a result of a recipes research.
 */
class RecipeSearchScreen extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.itemsPerPage = 20;
        this.state = {
            loading: true,
            page: 1,
            numberOfResults: -1,
            recipes: []
        }
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        this.searchRecipes();
    }

    /**
     * Call each time this component is called by the application
     * @param {object} prevProps old values to build this component
     */
    componentDidUpdate(prevProps) {
        if (this.props.location.data && prevProps.location.data &&
            this.props.location.data.searchingValue !== prevProps.location.data.searchingValue) {
            this.setState({ loading: true });
            this.searchRecipes();
        } else if (this.props.location.data && !prevProps.location.data) {
            this.setState({ loading: true });
            this.searchRecipes();
        }
    }

    /**
     * Search recipes using a name
     */
    searchRecipes() {
        if (this.props.location.data) {
            this.getNumberOfElementsToDisplay(this.props.location.data.searchingValue);
            RecipeService.searchRecipesByName(this.props.location.data.searchingValue, 1, this.itemsPerPage, (data) => {
                this.setState({ loading: false, recipes: data, page: 1 });
            });
        } else {
            this.setState({ loading: false });
        }
    }

    /**
     * Update number of results according to the searched value
     */
    getNumberOfElementsToDisplay = (valueSearched) => {
        RecipeService.getNumberOfRecipesForName(valueSearched, (result) => {
            this.setState({ numberOfResults: result });
        });
    }

    /**
     * Change result page to display
     */
    changePage = (pageNumberToGo) => {
        if (pageNumberToGo === this.state.page) {
            return;
        }

        this.setState({ loading: true });
        RecipeService.searchRecipesByName(this.props.location.data.searchingValue, pageNumberToGo, this.itemsPerPage, (data) => {
            this.setState({ loading: false, page: pageNumberToGo, recipes: data });
        });
    }

    /**
     * Use search bar to find recipes using their name
     */
    searchRecipesForName = (nameToSearch) => {
        if (!nameToSearch || nameToSearch === '') {
            return;
        }

        history.push({
            pathname: '/recipes',
            data: { searchingValue: nameToSearch }
        });
    }

    /**
     * Navigates to the recipe page
     */
    goToRecipePage = (recipe) => {
        history.push({
            pathname: `/recipes/${recipe.id}`,
            data: { recipe: recipe }
        });
    }

    /**
     * Render the component
     */
    render() {
        let content;
        let pagination;
        if (this.state.loading) {
            content = <Loading />;
        } else if (this.state.recipes.length === 0) {
            content = <NoResult text='Aucune recette à afficher.' />;
        } else {
            content = this.state.recipes.map(recipe => <span key={recipe.id} onClick={() => this.goToRecipePage(recipe)}><RecipeCard recipe={recipe} /></span>);
            if (this.state.numberOfResults > 0) {
                pagination = <ElfyPagination
                    activePage={this.state.page}
                    numberOfElements={this.state.numberOfResults}
                    itemsPerPage={this.itemsPerPage}
                    actionToDoOnPageClick={this.changePage}
                />;
            }
        }
        return (
            <div>
                <div className='search-bar'>
                    <SearchBar
                        placeholder='Rechercher une recette'
                        searchToDo={this.searchRecipesForName}
                    />
                </div>
                <RecipeForm />
                {content}
                {pagination}
            </div>
        );
    }
}

export default RecipeSearchScreen;