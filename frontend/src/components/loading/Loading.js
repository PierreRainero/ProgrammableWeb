import React from 'react';

import './Loading.scss';

class Loading extends React.Component {
    render() {
        return (
            <div>
                <img className="loadingGif" src={require("../../assets/imgs/loading.gif")} alt='loading'/>
            </div>
        );
    }
}

export default Loading;