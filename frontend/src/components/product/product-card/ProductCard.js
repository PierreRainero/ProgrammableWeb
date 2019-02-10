import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Product from '../Product';
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
     * Get CSS class according to the score of the product
     */
    getScoreValue() {
        if (this.product.score < 30) {
            return 'bad';
        } else if (this.product.score < 70) {
            return 'medium';
        } else {
            return 'good';
        }
    }

    /**
     * Get CSS class according to the nutrigrade of the product
     */
    getNutriscoreValue() {
        if (this.product.nutrigrade === '') {
            return 'e-value';
        }
        return `${this.product.nutrigrade.toLowerCase()}-value`;
    }

    /**
     * Get CSS class according to the nova group of the product
     */
    getNovaValue() {
        switch (this.product.novaGroup) {
            case 1:
                return 'a-value';

            case 2:
                return 'c-value';

            case 3:
                return 'd-value';

            case 4:
            default:
                return 'e-value';
        }
    }

    /**
     * Call after fully finishing to build this component
     */
    componentDidMount() {
        ProductService.getProductImage(this.product.code, (imgURL) => {
            if(imgURL!==''){
                this.product.img = imgURL;
                this.setState({ img: imgURL });
            }
        });
    }

    /**
     * Render the component
     */
    render() {
        const novaGroup = this.product.novaGroup > 0 ? this.product.novaGroup : undefined;

        return <Card style={{ width: '200px', display: 'inline-block' }} className='card-container clickable'>
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
                <Card.Subtitle className={`mb-2 ${this.getScoreValue()}-score`}>
                    {this.product.score}%
                </Card.Subtitle>
                <Card.Text>
                    <img
                        alt='product_img'
                        src={this.state.img}
                        width='150'
                        height='150'
                        className='d-inline-block align-bottom'
                    />
                    <span className='row'>
                        <span className='col'>
                            <span className='big-text definition'>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                            Nutriscore
                                        </Tooltip>
                                    }
                                >
                                    <Badge className={`${this.getNutriscoreValue()}`}>{this.product.nutrigrade}</Badge>
                                </OverlayTrigger>
                            </span>
                        </span>
                        <span className='col'>
                            <span className='big-text definition'>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                            Classification NOVA
                                        </Tooltip>
                                    }
                                >
                                    <Badge className={`${this.getNovaValue()}`}>
                                        {novaGroup}
                                    </Badge>
                                </OverlayTrigger>
                            </span>
                        </span>
                    </span>
                </Card.Text>
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