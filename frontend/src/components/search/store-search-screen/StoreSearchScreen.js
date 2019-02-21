import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Store from '../../store/Store';
import StoreService from '../../store/StoreService';

import './StoreSearchScreen.scss';


/**
 * Component to present a result of a store research.
 */
class StoreSearchScreen extends React.Component {
    /**
     * Normal constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            validated: false,
            newStoreName: '',
            stores: [],
            center: [43.615552, 7.072255] // Default value if the user position isn't available (Polytech'Nice-Sophia)
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getUserPosition);
        }

        this.newStore = new Store('', '', [], '');
        this.handleNewStoreNameChange = this.handleNewStoreNameChange.bind(this);
        this.searchStores();
    }

    /**
     * Set center of the map using current user position
     */
    getUserPosition = (position) => {
        this.setState({ center: [position.coords.latitude, position.coords.longitude] });
    }

    /**
     * Search all stores and add them into state.stores
     */
    searchStores() {
        StoreService.getStores((data) => {
            this.setState({ stores: data });
        });
    }

    /**
     * Handle the closure of the store creation modal
     */
    handleClose = () => {
        this.newStore = new Store('', '', [], '');
        this.setState({ show: false, newStoreName: '' }, () => this.checkFormValidity());
    }

    /**
     * Check if the form can be send
     */
    checkFormValidity = () => {
        if(this.state.newStoreName!==''){
            this.setState({ validated: true });
        } else {
            this.setState({ validated: false });
        }
    }

    /**
     * Handles and updates the name of the store to create
     */
    handleNewStoreNameChange = (event) => {
        this.newStore.name = event.target.value;
        this.setState({ newStoreName: event.target.value }, () => this.checkFormValidity());
    }
    
    /**
     * Handle click on map
     */
    clickOnMap = (event) => {
        this.newStore.location = { lat: event.latlng.lat, lng: event.latlng.lng };
        this.setState({ show: true });
    }

    /**
     * Create the store
     */
    createStore = (event) => {
        StoreService.createAStore(this.newStore, (result) => {
            if(result){
                this.newStore = new Store('', '', [], '');
                const storesWithNew = this.state.stores;
                storesWithNew.push(result);
                this.setState({ show: false, newStoreName: '', stores: storesWithNew }, () => this.checkFormValidity());
            }
        });

        this.handleClose();
        event.preventDefault();
    }


    /**
     * Render the component
     */
    render() {
        const markers = this.state.stores.map(store => <Marker key={store.id} position={store.location}><Popup><div className='font-weight-bold'>{store.name}</div><div className='subtitle'>{store.region}</div></Popup></Marker>);
        return (
            <div className='leaflet-container' >
                <LeafletMap center={this.state.center} zoom={13}
                    className='leaflet-map' id='mapid' onClick={this.clickOnMap}>
                    <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />
                    {markers}
                </LeafletMap>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un magasin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='text-left form-aerate'
                        noValidate
                        validated={this.state}
                        onSubmit={this.createStore}
                        >
                            <Form.Group controlId='formStoreName' className='tight'>
                            <Form.Label className='required-input'>Nom du magasin</Form.Label>
                            <Form.Control type='text' placeholder='Nom du magasin'
                                value={this.state.newStoreName} onChange={this.handleNewStoreNameChange} required
                                ref='storeForm-input-name'
                            />
                                <Form.Control.Feedback type="invalid">Veuillez entrer un nom pour le magasin.</Form.Control.Feedback>
                            </Form.Group>

                            <div className='text-center'>
                                <Button variant='primary' type='submit'
                                    className={`button-success ${!this.state.validated? 'disabled-cursor' : ''}`}
                                    disabled={!this.state.validated}
                                >
                                    <FontAwesomeIcon icon={faPlus} /><span> Ajouter</span>
                                </Button>           
                            </div>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default StoreSearchScreen;