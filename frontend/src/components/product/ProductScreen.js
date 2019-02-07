import React from "react";

import { Alert } from 'react-bootstrap';

import './ProductScreen.scss';

class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);
    }


    render() {
        return (
            <div>
                <div>
                    <Alert variant='primary'>
                        This is a primary alert with
                        <Alert.Link href="#">Product</Alert.Link> screen
                    </Alert>

                </div>
            </div>
        );
    }
}

export default ProductScreen;