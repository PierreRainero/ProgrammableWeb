import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
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
            stores: [],
            center: [43.615552, 7.072255] // Default value if the user position isn't available (Polytech'Nice-Sophia)
        }

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getUserPosition);
        }

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
     * Render the component
     */
    render() {
        const markers = this.state.stores.map(store => <Marker key={store.id} position={store.location}><Popup><div className='font-weight-bold'>{store.name}</div><div className='subtitle'>{store.region}</div></Popup></Marker>);
        return (
            <div className='leaflet-container' >
                <LeafletMap center={this.state.center} zoom={13} className='leaflet-map' id='mapid'>
                    <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />
                    {markers}
                </LeafletMap>
            </div>
        );
    }
}

export default StoreSearchScreen;