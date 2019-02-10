import React from 'react';
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

        this.state = {
            loading: true,
            products: []
        }
    }

    /**
     * Search products using a name
     */
    searchProducts() {
        if (this.props.location.data) {
            ProductService.searchProductsByName(this.props.location.data.searchingValue, (data) => {
                this.setState({ loading: false, products: data });
            });
        }else {
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
        if(this.props.location.data && this.props.location.data.searchingValue !== prevProps.location.data.searchingValue){
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
     * Render the component
     */
    render() {
        let content;
        if(this.state.loading){
            content = <Loading />;
        }else if(this.state.products.length === 0){
            content = <p className='vertical-delay'>Aucun produit n'a été trouvé</p>;
        }else {
            content = this.state.products.map(product => <span key={product.code} onClick={() => this.goToProductPage(product)}><ProductCard product={product} /></span>);
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default SearchScreen;