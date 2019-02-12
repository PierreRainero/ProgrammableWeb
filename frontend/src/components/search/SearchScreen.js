import React from 'react';
import { Pagination } from 'react-bootstrap';
import ProductCard from '../product/product-card/ProductCard';
import Loading from '../loading/Loading'
import history from '../../history';

import ProductService from '../product/ProductService';

import './SearchScreen.scss';

/**
 * Component to present a result of a product research.
 */
class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.itemsPerPage = 20;
        this.state = {
            loading: true,
            page: 1,
            numberOfResults: -1,
            products: []
        }

        if (this.props.location.data){
            ProductService.getNumberOfProductsForName(this.props.location.data.searchingValue, (result) => {
                this.setState({ numberOfResults: result });
            });
        }
    }

    /**
     * Search products using a name
     */
    searchProducts() {
        if (this.props.location.data) {
            ProductService.searchProductsByName(this.props.location.data.searchingValue, this.state.page, this.itemsPerPage, (data) => {
                this.setState({ loading: false, products: data });
            });
        } else {
            this.setState({ loading: false });
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
        }
    }

    /**
     * Navigates to the page of a product
     */
    goToProductPage = (product) => {
        history.push({
            pathname: `/products/${product.code}`,
            data: { product: product }
        });
    }

    /**
     * Change result page to display
     */
    changePage = (event, pageNumberToGo) => {
        if(pageNumberToGo===this.state.page){
            return;
        }

        this.setState({ loading: true });
        ProductService.searchProductsByName(this.props.location.data.searchingValue, pageNumberToGo, this.itemsPerPage, (data) => {
            this.setState({ loading: false, page: pageNumberToGo, products: data });
        });

        event.preventDefault();
    }

    /**
     * Create a pagination item
     */
    createPaginationItem = (index) => {
        return <Pagination.Item key={index}
            active={index === this.state.page}
            onClick={(e)=>this.changePage(e,index)}>
        {index}
        </Pagination.Item>;
    }

    /**
     * Return the maximum page of results
     */
    getMaximumPage = () => {
        return Math.ceil(this.state.numberOfResults/this.itemsPerPage);
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
            content = <p className='vertical-delay'>Aucun produit n'a été trouvé</p>;
        } else {
            content = this.state.products.map(product => <span key={product.code} onClick={() => this.goToProductPage(product)}><ProductCard product={product} /></span>);
            
            if(this.state.numberOfResults>0){
                let paginationContent = [];
                let pageNumber = 1;
                for (let numberOfElementsCount = 0;
                    numberOfElementsCount < this.state.numberOfResults;
                    numberOfElementsCount=numberOfElementsCount+this.itemsPerPage) {
                    paginationContent.push(this.createPaginationItem(pageNumber));
                    pageNumber++;
                }
                pagination = <Pagination>
                    <Pagination.First onClick={(e)=>this.changePage(e,1)}/>
                    <Pagination.Prev onClick={(e)=>this.changePage(e,this.state.page-1)} disabled={this.state.page === 1}/>
                    {paginationContent}
                    <Pagination.Next onClick={(e)=>this.changePage(e,this.state.page+1)} disabled={this.state.page === this.getMaximumPage()}/>
                    <Pagination.Last onClick={(e)=>this.changePage(e,this.getMaximumPage())}/>
                </Pagination>;
            }
        }
            
        return (
            <div>
                {content}
                <div className='center'>
                    {pagination}
                </div>
            </div>
        );
    }
}

export default SearchScreen;