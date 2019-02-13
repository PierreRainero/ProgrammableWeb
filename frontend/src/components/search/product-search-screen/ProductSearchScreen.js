import React from 'react';
import ProductCard from '../../product/product-card/ProductCard';
import ProductsSearchBar from '../searchBar/ProductsSearchBar';
import Loading from '../../loading/Loading';
import ElfyPagination from '../../pagination/ElfyPagination';
import history from '../../../history';

import ProductService from '../../product/ProductService';

import './ProductSearchScreen.scss';

/**
 * Component to present a result of a product research.
 */
class ProductSearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.itemsPerPage = 20;
        this.state = {
            loading: true,
            page: 1,
            numberOfResults: -1,
            products: []
        }
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        this.searchProducts();
    }

    /**
     * Call each time this component is called by the application
     * @param {object} prevProps old values to build this component
     */
    componentDidUpdate(prevProps) {
        if (this.props.location.data && prevProps.location.data &&
            this.props.location.data.searchingValue !== prevProps.location.data.searchingValue) {
            this.setState({ loading: true });
            this.searchProducts();
        } else if (this.props.location.data && !prevProps.location.data){
            this.setState({ loading: true });
            this.searchProducts();
        }
    }

        /**
     * Search products using a name
     */
    searchProducts() {
        if (this.props.location.data) {
            this.getNumberOfElementsToDisplay(this.props.location.data.searchingValue);
            ProductService.searchProductsByName(this.props.location.data.searchingValue, 1, this.itemsPerPage, (data) => {
                this.setState({ loading: false, products: data, page: 1 });
            });
        } else {
            this.setState({ loading: false });
        }
    }

    /**
     * Navigates to the page of a product
     */
    goToProductsPage = (product) => {
        history.push({
            pathname: `/products/${product.code}`,
            data: { product: product }
        });
    }

    /**
     * Update number of results according to the searched value
     */
    getNumberOfElementsToDisplay = (valueSearched) => {
        ProductService.getNumberOfProductsForName(valueSearched, (result) => {
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
        ProductService.searchProductsByName(this.props.location.data.searchingValue, pageNumberToGo, this.itemsPerPage, (data) => {
            this.setState({ loading: false, page: pageNumberToGo, products: data });
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
        } else if (this.state.products.length === 0) {
            content = <p className='vertical-delay'>Aucun produit à afficher.</p>;
        } else {
            content = this.state.products.map(product => <span key={product.code} onClick={() => this.goToProductsPage(product)}><ProductCard product={product} /></span>);
            if(this.state.numberOfResults>0){
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
                    <ProductsSearchBar />
                </div>
                {content}
                {pagination}
            </div>
        );
    }
}

export default ProductSearchScreen;