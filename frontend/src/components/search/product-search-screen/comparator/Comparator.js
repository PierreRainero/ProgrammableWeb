import React from 'react';

import './Comparator.scss';
import {Droppable} from "react-drag-and-drop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {Button} from "react-bootstrap";

/**
 * Component comparing products.
 */
class Comparator extends React.Component {

    state={
        open: false,
        toCompare: []
    }
    addProductToCompare = this.addProductToCompare.bind(this);
    removeProductToCompare = this.removeProductToCompare.bind(this);
    compare = this.compare.bind(this);

    addProductToCompare(product){
        if(this.state.toCompare.length < 4 && this.state.toCompare.indexOf(product.product) === -1) {
            let newToCompare = this.state.toCompare;
            newToCompare.push(product.product);
            this.setState({toCompare: newToCompare});
        }
    }

    removeProductToCompare(product){
        let position = this.state.toCompare.indexOf(product);
        if(this.state.toCompare.length > 0 && position !== -1) {
            let newToCompare = this.state.toCompare;
            newToCompare.splice(position, 1);
            this.setState({toCompare: newToCompare});
        }
    }

    compare(){
        let products = [];
        for(let product of this.state.toCompare){
            products.push(product.split('|')[0]);
        }
        this.props.callback(products);
    }

    /**
     * Render the component
     */
    render() {
        return (
            <div className='comparator shadow'>
                <div className='comparatorHeader clickable' onClick={() => this.setState({open: !this.state.open})}>
                    <div className='comparatorHeaderLeft'>Comparateur</div>
                    <div className='comparatorHeaderRight'>
                        {
                            this.state.open ?
                                <FontAwesomeIcon icon={faMinus} />
                                : <FontAwesomeIcon icon={faPlus} />
                        }
                    </div>
                </div>
                {
                    this.state.open ?
                        <div className='comparatorBody'>
                            {
                                this.state.toCompare.length > 0 ?
                                    <div className='compareList'>
                                        <ul className='compareListNames'>
                                            {
                                                this.state.toCompare.map((item, index) => {
                                                    let itemName = item.split('|')[1];
                                                    return (
                                                        <li key={index}>{itemName.substr(0, 25)}{itemName.length > 25 ? '...' : ''}</li>
                                                    );
                                                })
                                            }
                                        </ul>
                                        <ul className='compareListIcons'>
                                            {
                                                this.state.toCompare.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <FontAwesomeIcon icon={faMinus} className='clickable'
                                                                             onClick={() => this.removeProductToCompare(item)}/>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                        {
                                            this.state.toCompare.length > 1 ?
                                                <Button variant='' className='button-secondary compareButton' onClick={() => this.compare()}>Comparer</Button>
                                                : null
                                        }
                                    </div>
                                    : null
                            }
                            {
                                this.state.toCompare.length < 4 ?
                                <Droppable
                                    types={['product']}
                                    onDrop={data => this.addProductToCompare(data)}
                                    className='productDroppable'>
                                    <span>Glissez un produit ici</span>
                                </Droppable>
                                : null
                            }
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default Comparator;