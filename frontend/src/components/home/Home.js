import React from 'react';
import ProductCard from '../product/product-card/ProductCard';
import Product from '../product/Product';

import './Home.scss';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>
                    Home
                    <ProductCard product={new Product(-1, 'Nutella', 5, 'C', 4, [], [], [])}/>
                    <ProductCard product={new Product(-1, 'Eau', 98, 'A', 1, [], [], [])}/>
                </div>
            </div>
        );
    }
}

export default Home;