import React from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import StoreService from "../../store/StoreService";
import ProductService from "../ProductService";

/**
 * Component to add a new price.
 */
class NewPriceModal extends React.Component {

    state={
        stores: [],
        selectedStore: null,
        price: 0,
        isPriceInvalid: false
    }

    componentWillMount(){
        StoreService.getStores(stores => {
            this.setState({stores: stores, selectedStore: stores[0].id});
        });
    }

    /**
     * Render the component
     */
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ajouter un prix
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Produit :
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control plaintext readOnly defaultValue={this.props.product.name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formSelectStore">
                            <Form.Label column sm="3">
                                Magasin :
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" value={this.state.selectedStore} onChange={select => this.setState({selectedStore: select.target.value})}>
                                    {
                                        this.state.stores.map((store, index) => {
                                            return(
                                                <option key={index} value={store.id}>{store.name}</option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPrice">
                            <Form.Label column sm="3">
                                Prix :
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    isInvalid={this.state.isPriceInvalid}
                                    type="number"
                                    placeholder="Prix"
                                    min='0'
                                    step='0.01'
                                    value={this.state.price}
                                    onChange={price => this.setState({price: price.target.value})}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant=''
                        className='button-secondary addButton'
                        onClick={() => {
                            if(this.state.price !== 0) {
                                ProductService.setProductPrice(this.props.product.code, this.state.selectedStore, this.state.price).then(() => this.props.update()).catch(error => console.error(error.message));
                                this.props.onHide();
                            } else {
                                this.setState({isPriceInvalid: true});
                            }
                        }}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NewPriceModal;