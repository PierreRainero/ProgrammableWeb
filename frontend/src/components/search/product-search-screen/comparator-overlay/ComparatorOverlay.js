import React from 'react';

import './ComparatorOverlay.scss';
import {Card, Col} from "react-bootstrap";
import ProductScore from "../../../product/product-score/ProductScore";
import ProductService from "../../../product/ProductService";
import CardList from "../../../cardList/CardList";
import PricesCard from "../../../product/pricesCard/PricesCard";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * Component displaying products comparisons.
 */
class ComparatorOverlay extends React.Component {

    state={
        products: [],
        productsImages: [
            require('../../../../assets/imgs/placeholder.png'),
            require('../../../../assets/imgs/placeholder.png'),
            require('../../../../assets/imgs/placeholder.png'),
            require('../../../../assets/imgs/placeholder.png')
        ],
        productsPrices: []
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.products) {
            this.setState({products: []}, () => {
                nextProps.products.map((product, index) => {
                    ProductService.searchProductByCode(product).then(product => {
                        let newProducts = this.state.products;
                        newProducts[index] = product;
                        this.setState({products: newProducts});
                    }).catch(err => console.error(err.message));
                    ProductService.getProductImage(product, null, (imgURL) => {
                        if (imgURL && imgURL !== '') {
                            let newProductsImages = this.state.productsImages;
                            newProductsImages[index] = imgURL;
                            this.setState({ productsImages: newProductsImages });
                        }
                    });
                    ProductService.getProductPrices(product).then(prices => {
                        let newProductsPrices = this.state.productsPrices;
                        newProductsPrices[index] = prices;
                        this.setState({ productsPrices: newProductsPrices });
                    }).catch(err => console.error(err.message));
                });
            });
        }
    }

    /**
     * Render the component
     */
    render() {
        let nbElements = this.state.products.length;
        let colSize = 12 / nbElements;
        return (
            <div>
            {
                this.props.show ?
                    <div className='comparatorOverlay'>
                        <div className='comparatorOverlayClose clickable' onClick={() => this.props.close()}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <Col md={colSize} className='comparatorOverlayCol' key={index}>
                                        <Card>
                                            <Card.Body>
                                                <div className='comparatorOverlayImage'>
                                                    <img
                                                        src={this.state.productsImages[index]}
                                                        alt={product.name}
                                                        className={'shadow'}
                                                    />
                                                </div>
                                                <Card.Title className='comparatorOverlayTitle'>{product.name}</Card.Title>
                                                <div>
                                                    <div className='comparatorOverlayScore'>
                                                        <ProductScore score={product.score} nutrigrade={product.nutrigrade} novaGroup={product.novaGroup} />
                                                    </div>
                                                </div>
                                                <Col
                                                    md={nbElements > 2 ? 12 : 6}
                                                    className='comparatorOverlayCard'
                                                    style={{height: nbElements > 2 ? '20%' : '50%', marginBottom: nbElements > 2 ? '10px': '0'}}>
                                                    <CardList title='Ingrédients' data={product.ingredients} />
                                                </Col>
                                                <Col
                                                    md={nbElements > 2 ? 12 : 6}
                                                    className='comparatorOverlayCard'
                                                    style={{height: nbElements > 2 ? '20%' : '50%', marginBottom: nbElements > 2 ? '10px': '0'}}>
                                                    <PricesCard title='Comparaison des prix' data={this.state.productsPrices[index]} product={product} />
                                                </Col>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </div>
                    : null
            }
            </div>
        );
    }
}

export default ComparatorOverlay;