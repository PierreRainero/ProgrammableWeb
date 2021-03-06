import React from 'react';
import PropTypes from 'prop-types';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Product from '../Product';
import ProductScore from '../product-score/ProductScore'
import ProductService from '../ProductService';

import './ProductCard.scss';
import {Draggable} from "react-drag-and-drop";

/**
 * Component to quickly present a product.
 */
class ProductCard extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            img: require('../../../assets/imgs/placeholder.png')
        }

        this.signalController = new AbortController()
        this.product = props.product;
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        ProductService.getProductImage(this.product.code, this.signalController.signal, (imgURL) => {
            if (imgURL !== '') {
                this.product.img = imgURL;
                this.setState({ img: imgURL });
            }
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
     * Render the component
     */
    render() {
        return (
            <Draggable style={{display: 'inline-block'}} type="product" data={`${this.product.code}|${this.product.name}`}>
                <Card style={{ width: '200px' }} className='product-card-container clickable shadow'>
                    <Card.Body className='product-card-content'>
                        <OverlayTrigger
                            placement='top'
                            overlay={
                                <Tooltip>
                                    {this.product.name}
                                </Tooltip>
                            }
                        >
                            <Card.Title className='one-line-title' ref='product-card-title'>{this.product.name}</Card.Title>
                        </OverlayTrigger>
                        <img
                            alt='product_img'
                            src={this.state.img}
                            className='d-inline-block align-bottom productImg'
                        />
                        <div className='score-zone'>
                            <ProductScore score={this.product.score} nutrigrade={this.product.nutrigrade} novaGroup={this.product.novaGroup} fontsize='12pt'/>
                        </div>
                    </Card.Body>
                </Card>
            </Draggable>
        );
    }
}

ProductCard.defaultProps = {
    product: new Product('', '', -1, '', -1, [], [], [])
};

ProductCard.propTypes = {
    product: PropTypes.object
};

export default ProductCard;