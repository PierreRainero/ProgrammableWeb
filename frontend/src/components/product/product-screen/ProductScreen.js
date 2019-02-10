import React from 'react';

import './ProductScreen.scss';
import Loading from "../../loading/Loading";
import ProductService from "../ProductService";
import ProductScore from "../product-score/ProductScore";

class ProductScreen extends React.Component {

    state = {
        loading: true,
        product: null
    }

    componentWillMount(){
        ProductService.getProductInfos(this.props.match.params.id).then(product => {
            console.log(product);
            this.setState({loading: false, product: product});
        }).catch(error => {
            //TODO
        });
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <div>
                        <Loading/>
                    </div>
                    :
                    <div>
                        <div className="productHeader">
                            <img src="http://lorempixel.com/1920/300/food" />
                        </div>
                        <div className="productGeneralInfos">
                            <div className="productImage">
                                <img src="http://lorempixel.com/400/400/food" alt={this.state.product.name} className={'shadow'} />
                            </div>
                            <div className="productName textShadow">{this.state.product.name}</div>
                            <div className="productScorePart">
                                <ProductScore score={this.state.product.score} nutrigrade={this.state.product.nutrigrade} novaGroup={this.state.product.novaGroup}/>
                            </div>
                        </div>
                        <div className="productDetails">
                            details
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ProductScreen;