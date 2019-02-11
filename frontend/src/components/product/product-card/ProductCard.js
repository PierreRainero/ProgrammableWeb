import React from 'react';
import PropTypes from 'prop-types';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Product from '../Product';
import ProductScore from '../product-score/ProductScore'
import ProductService from '../ProductService';

import './ProductCard.scss';

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
        this.product = props.product;
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        ProductService.getProductImage(this.product.code, (imgURL) => {
            if (imgURL !== '') {
                this.product.img = imgURL;
                this.setState({ img: imgURL });
            }
        });
    }

    /**
     * Render the component
     */
    render() {
        return <Card style={{ width: '200px', display: 'inline-block' }} className='card-container clickable shadow'>
            <Card.Body className='card-content'>
                <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>
                            {this.product.name}
                        </Tooltip>
                    }
                >
                    <Card.Title className='one-line-title'>{this.product.name}</Card.Title>
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
        </Card>;
    }
}

ProductCard.defaultProps = {
    product: new Product(-1, '', -1, '', -1, [], [], [])
};

ProductCard.propTypes = {
    product: PropTypes.object
};

export default ProductCard;