import React from 'react';
import ProductCard from '../product/product-card/ProductCard';
import Loading from '../loading/Loading'
import history from '../../history';

import ProductService from '../product/ProductService';

import './SearchScreen.scss';

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            products: []
        }
    }

    componentDidMount() {
        if (this.props.location.data) {
            ProductService.searchProductsByName(this.props.location.data.searchingValue, (data) => {
                this.setState({ loading: false, products: data });
            });
        }else {
            this.setState({ loading: false });
        }
    }

    goToProductPage = (product) => {
        history.push({
            pathname: `/products/${product.code}`,
            data: { product: product }
        });
    }


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