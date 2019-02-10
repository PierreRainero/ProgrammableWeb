import React from 'react';

import './Loading.scss';

/**
 * Composent used when the user have to wait for something.
 */
class Loading extends React.Component {
    /**
     * Render the component
     */
    render() {
        return (
            <div>
                <img className="loadingGif" src={require("../../assets/imgs/loading.gif")} alt='loading'/>
            </div>
        );
    }
}

export default Loading;