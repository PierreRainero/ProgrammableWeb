import React from 'react';
import ProductCard from '../product/product-card/ProductCard';

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


    render() {
        return (
            <div>
                {
					this.products.map(product => <ProductCard product={product} key={product.code} className="clickable"/>)
                }
            </div>
        );
    }
}

export default SearchScreen;