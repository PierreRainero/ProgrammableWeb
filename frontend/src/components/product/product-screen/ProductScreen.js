import React from 'react';
import Loading from '../../loading/Loading';
import ProductService from '../ProductService';
import ProductScore from '../product-score/ProductScore';
import CardList from './cardList/CardList';
import { Col, Container } from 'react-bootstrap';

import './ProductScreen.scss';

/**
 * Component to fully present a product.
 */
class ProductScreen extends React.Component {

    state = {
        loading: true,
        product: null,
        productImage: require('../../../assets/imgs/placeholder.png')
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        if (this.props.location.data) {
            const productReceived = this.props.location.data.product;
            if (productReceived.img !== '') {
                this.setState({ loading: false, product: productReceived, productImage: productReceived.img });
            } else {
                this.setState({ loading: false, product: productReceived });
            }
        } else {
            ProductService.searchProductByCode(this.props.match.params.id).then(product => {
                this.setState({ loading: false, product: product });
                ProductService.getProductImage(this.state.product.code, (imgURL) => {
                    if (imgURL !== '') {
                        this.setState({ productImage: imgURL });
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });
        }
    }

    /**
     * Render the component
     */
    render() {
        return (
            <div>
                {this.state.loading ?
                    <div>
                        <Loading />
                    </div>
                    :
                    <div>
                        <div className='productHeader'>
                            <img src='http://lorempixel.com/1920/300/food' alt='header' />
                        </div>
                        <div className='productGeneralInfos'>
                            <div className='productImage'>
                                <img
                                    src={this.state.productImage}
                                    alt={this.state.product.name}
                                    className={'shadow'}
                                />
                            </div>
                            <div className={`productName ${window.innerWidth > 576 ? 'textShadow' : ''}`}>{this.state.product.name}</div>
                            <div className='productScorePart'>
                                <ProductScore score={this.state.product.score} nutrigrade={this.state.product.nutrigrade} novaGroup={this.state.product.novaGroup} />
                            </div>
                        </div>
                        <Container className='productDetails'>
                            <Col md={4}>
                                <CardList title='Ingrédients' data={this.state.product.ingredients} />
                            </Col>
                            <Col md={4}>
                                <CardList title='Additifs' data={this.state.product.additives} />
                            </Col>
                            <Col md={4}>
                                <CardList title='Allergènes' data={this.state.product.allergens} />
                            </Col>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

export default ProductScreen;