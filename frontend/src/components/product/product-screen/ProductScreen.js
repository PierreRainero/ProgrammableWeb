import React from 'react';

import './ProductScreen.scss';
import Loading from "../../loading/Loading";
import ProductService from "../ProductService";
import ProductScore from "../product-score/ProductScore";
import CardList from "./cardList/CardList";

class ProductScreen extends React.Component {

    state = {
        loading: true,
        product: null
    }

    componentDidMount(){
        if(this.props.location.data){
            this.setState({ loading: false, product: this.props.location.data.product });
        } else {
            ProductService.searchProductByCode(this.props.match.params.id).then(product => {
                this.setState({loading: false, product: product});
            }).catch(error => {
                console.log(error.message);
            });
        }
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
                            <CardList title="Ingrédients" data={this.state.product.ingredients}/>
                            <CardList title="Additifs" data={this.state.product.additives}/>
                            <CardList title="Allergènes" data={this.state.product.allergens}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ProductScreen;