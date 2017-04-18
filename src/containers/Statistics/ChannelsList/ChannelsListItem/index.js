import React from 'react';

import Wrapper from './Wrapper';

class ChannelsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    getType() {
        return this.props.connection.type.split('_')[1];
    }

    getStatusLabel() {
        switch(this.props.connection.status) {
            case '3': return <div className="disconnectedLabel"><i className="fa fa-warning"></i> Reconnect</div>;
        }
    }

    render() {
        return (
            <Wrapper>
                <div className= "connectionIcon">
                    <i className={ this.props.connection.channel_icon + ' ' + this.props.connection.channel }></i>
                </div>
                <div style={{ float: 'left' }}>
                    <div className="connectionName">
                        { this.props.connection.display_name }
                    </div>
                    <div className={ this.props.connection.channel }>
                        {this.getType()[0].toUpperCase() + this.getType().slice(1)}
                    </div>
                </div>
                <div>
                    <div className="controlBlock">
                        {this.getStatusLabel()}
                    </div>
                    <div className="clearBoth"></div>
                </div>
            </Wrapper>
        );
    }
}

ChannelsListItem.propTypes = {
    children: React.PropTypes.node,
};

export default ChannelsListItem;
