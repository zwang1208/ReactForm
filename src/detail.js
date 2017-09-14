import React, { Component } from 'react';

class Detail extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.firstname}{this.props.lastname}</h3>
            </div>
        )
    }
}
export default Detail;
