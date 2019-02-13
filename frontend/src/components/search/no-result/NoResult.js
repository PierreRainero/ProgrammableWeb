import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

import './NoResult.scss';

/**
 * Component to display when a search finished without any result.
 */
class NoResult extends React.Component {
    /**
     * Render the component
     */
    render() {
        return <div className='vertical-delay'>
            <Image src={require('../../../assets/imgs/eated-plate.png')} alt='no-result-img' fluid />
            <p>{this.props.text}</p>
        </div>;
    }
}

NoResult.defaultProps = {
    text: ''
};

NoResult.propTypes = {
    text: PropTypes.string
};

export default NoResult;