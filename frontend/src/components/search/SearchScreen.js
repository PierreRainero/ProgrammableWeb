import React from 'react';
import ProductCard from '../product/product-card/ProductCard';
import history from '../../history';

import './SearchScreen.scss';

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.location.data){
            this.products = this.props.location.data.products;
        }else{
            this.products = [];
        }
    }

    goToProductPage= (product) => {
		history.push({
            pathname: `/products/${product.code}`,
            data: { product: product }
        });
    }


    render() {
        return (
            <div>
                {
					this.products.map(product => <span key={product.code} onClick={() => this.goToProductPage(product)}><ProductCard product={product}/></span>)
                }
            </div>
        );
    }
}

export default SearchScreen;