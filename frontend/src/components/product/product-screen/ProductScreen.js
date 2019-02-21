import React from 'react';
import Loading from '../../loading/Loading';
import ProductService from '../ProductService';
import ProductScore from '../product-score/ProductScore';
import CardList from '../../cardList/CardList';
import history from '../../../history';
import { Col, Container, Row } from 'react-bootstrap';

import './ProductScreen.scss';

/**
 * Component to fully present a product.
 */
class ProductScreen extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            product: null,
            productImage: require('../../../assets/imgs/placeholder.png'),
            recipes: [],
            prices: []
        }

        this.signalController = new AbortController()
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
                ProductService.getProductImage(this.state.product.code, this.signalController.signal, (imgURL) => {
                    if (imgURL !== '') {
                        this.setState({ productImage: imgURL });
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });
        }
        ProductService.getProductRecipes(this.props.match.params.id).then(recipes => {
            this.setState({ recipes: recipes });
        }).catch(error => {
            console.log(error.message);
        });
    }

    /**
     * Call when this component is destroyed 
     */
    componentWillUnmount(){
        this.signalController.abort();
        this.mounted = false;
    }

    /**
     * Go to recipe page
     */
    goToRecipePage = (item) => {
        history.push({
            pathname: `/recipes/${item._id}`
        });
    }

    /**
     * Render the component
     */
    render() {
        return (
            <div style={{ height: '100%' }}>
                {this.state.loading ?
                    <div>
                        <Loading />
                    </div>
                    :
                    <div style={{ height: '100%' }}>
                        <div className='productHeader'>
                            <img src='http://lorempixel.com/1920/250/food' alt='header' />
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
                        <div>

                        </div>
                        <Container className='productDetails'>
                            <Row className='productDetailsRow'>
                                <Col md={4}>
                                    <CardList title='Ingrédients' data={this.state.product.ingredients} />
                                </Col>
                                <Col md={4}>
                                    <CardList title='Additifs' data={this.state.product.additives} />
                                </Col>
                                <Col md={4}>
                                    <CardList title='Allergènes' data={this.state.product.allergens} />
                                </Col>
                            </Row>
                            <Row className='productDetailsRow'>
                                <Col md={6}>
                                    <CardList title='Recettes' data={this.state.recipes} actionOnClick={this.goToRecipePage}  />
                                </Col>
                                <Col md={6}>
                                    <CardList title='Comparaison des prix' data={[]} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

export default ProductScreen;