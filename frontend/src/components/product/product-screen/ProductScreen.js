import React from 'react';
import { Alert } from 'react-bootstrap';
import ProductService from '../ProductService';

import './ProductScreen.scss';

class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.location.data){
            this.setState({ product: this.props.location.data.product });
        } else {
            ProductService.searchProductByCode(this.props.match.params.id, (data)=> {
                this.setState({ product: data });
            });
        }
    }


    render() {
        if(this.state){
            console.log(this.state.product);
        }
        
        return (
            <div>
                <div>
                    <Alert variant='primary'>
                        This is a primary alert with
                        <Alert.Link href='#'>Product</Alert.Link> screen
                    </Alert>

                </div>
            </div>
        );
    }
}

export default ProductScreen;