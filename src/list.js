import React, { Component } from 'react';
import Detail from './detail';

class DetailList extends Component {
    render() {
        let detailNodes = this.state.data.map(detail => {
            return (
                <Detail user={ detail.firstname } key={ detail['_id'] }>
                    { detail.lastname}
                </Detail>
            )
        });
        return (
            <div>
                { detailNodes }
            </div>
        )
    }
}
export default DetailList;