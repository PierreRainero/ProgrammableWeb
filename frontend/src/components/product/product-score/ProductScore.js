import React from 'react';
import PropTypes from 'prop-types';

import './ProductScore.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/**
 * Component to group all rates of a product.
 */
class ProductScore extends React.Component {
    /**
     * Get CSS class according to the score of the product
     */
    getScoreValue() {
        if (this.props.score < 30) {
            return 'bad';
        } else if (this.props.score < 70) {
            return 'medium';
        } else {
            return 'good';
        }
    }

    /**
     * Get CSS class according to the nutrigrade of the product
     */
    getNutriscoreValue() {
        if (this.props.nutrigrade === '') {
            return 'e-value';
        }
        return `${this.props.nutrigrade.toLowerCase()}-value`;
    }

    /**
     * Get CSS class according to the nova group of the product
     */
    getNovaValue() {
        switch (this.props.novaGroup) {
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
     * Render the component
     */
    render() {
        const novaGroup = this.props.novaGroup > 0 ? this.props.novaGroup : undefined;
        return (
            <div className='productScoreContainer shadow'>
                <div className={`productScore ${this.getScoreValue()}-score`}>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Score du produit
                            </Tooltip>
                        }
                    >
                        <div className='productScoreContent'>{this.props.score}%</div>
                    </OverlayTrigger>
                </div>
                <div className='productScoreBottom'>
                    <div className={`productNutrigrade ${this.getNutriscoreValue()}`}>
                        <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Nutrigrade
                                </Tooltip>
                            }
                        >
                            <div className='productNutrigradeContent'>{this.props.nutrigrade || ''}</div>
                        </OverlayTrigger>
                    </div>
                    <div className={`productNovaGroup ${this.getNovaValue()}`}>
                        <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    NovaGroup
                                </Tooltip>
                            }
                        >
                            <div className='productNovaGroupContent'>{novaGroup}</div>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        );
    }
}

ProductScore.defaultProps = {
    score: 0,
    nutrigrade: '',
    novaGroup: -1

};

ProductScore.propTypes = {
    score: PropTypes.number,
    nutrigrade: PropTypes.string,
    novaGroup: PropTypes.number
};

export default ProductScore;