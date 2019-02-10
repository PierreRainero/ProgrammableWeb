import React from 'react';

import './ProductScreen.scss';
import Loading from "../../loading/Loading";

class ProductScreen extends React.Component {

    state = {
        loading: true,
        name: ""
    }

    componentWillMount(){
        console.log(this.props.match.params.id);
        setTimeout(() => {
            this.setState({loading: false, name: "Product Test"});
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <div>
                        <Loading/>
                    </div>
                    :
                    <div>
                        <div className="productHeader">
                            <img src="http://lorempixel.com/1920/300/food" />
                        </div>
                        <div className="productContent">
                            <div className="productImage">
                                <img src="http://lorempixel.com/400/400/food" alt={this.state.name} className={'shadow'} />
                            </div>
                            <div className="productName textShadow">{this.state.name}</div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ProductScreen;