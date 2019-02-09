import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';

import Product from '../Product';

import './ProductCard.scss';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.product = props.product;
    }

    getScoreValue() {
        if (this.product.score < 30) {
            return 'bad';
        } else if (this.product.score < 70) {
            return 'medium';
        } else {
            return 'good';
        }
    }

    getNutriscoreValue() {
        if (this.product.nutrigrade === '') {
            return 'e-value';
        }
        return `${this.product.nutrigrade.toLowerCase()}-value`;
    }

    getNovaValue() {
        switch(this.product.novaGroup){
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

    render() {
        return <Card style={{ width: '200px' }} className='card-container'>
            <Card.Body className='card-content'>
                <Card.Title>{this.product.name}</Card.Title>
                <Card.Subtitle className={`mb-2 ${this.getScoreValue()}-score`}>
                    {this.product.score}%
                </Card.Subtitle>
                <Card.Text>
                    <img
                        alt='product_img'
                        src={require('../../../assets/imgs/placeholder.png')}
                        width='150'
                        height='150'
                        className='d-inline-block align-bottom'
                    />
                    <span className='row'>
                        <span className='col'>
                            <span className='big-text'>
                                <Badge className={`${this.getNutriscoreValue()}`}>{this.product.nutrigrade}</Badge>
                            </span>
                        </span>
                        <span className='col'>
                            <span className='big-text'>
                                <Badge className={`${this.getNovaValue()}`}>{this.product.novaGroup}</Badge>
                            </span>
                        </span>
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    }
}

ProductCard.defaultProps = {
    product: new Product(-1, '', -1, '', -1, [], [], [])
};

ProductCard.propTypes = {
    product: PropTypes.object
};

export default ProductCard;