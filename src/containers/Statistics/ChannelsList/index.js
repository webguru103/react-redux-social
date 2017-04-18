import React from 'react';


import ChannelsListItem from './ChannelsListItem';
import ConnectionsControlBar from './ConnectionsControlBar';
import TabLink from 'elements/atm.TabLink';
import Analytics from './Analytics';

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let connectionsList;

        if((this.props.connections !== undefined) && (this.props.connections.length > 0)) {
            connectionsList = [];
            
            this.props.connections.map((connection, index) => {
                if(connection.channel != 'wordpress') {
                    connectionsList.push(
                        <TabLink to={ '/account/' + this.props.accountId + '/statistics/' + connection.connection_id } key={ index + 'a' }>
                            <ChannelsListItem connection={connection}/>
                        </TabLink>
                    );
                }
            });
        } else {
            connectionsList = 'You currently have no connections';
        }

        return (
            <Analytics>
                <div className={ ['col-xs-3', 'col-sm-3', 'col-md-3', 'tabLink'].join(' ') }>
                    <ConnectionsControlBar
                        setChannelFilter={ this.props.setChannelFilter }
                        channelFilter={ this.props.channelFilter }
                    />
                    { connectionsList }
                </div>
                <div className={ ['col-xs-9', 'col-sm-9', 'col-md-9'].join(' ') }>
                        { this.props.loading }
                </div>
            </Analytics>
        );
    }
}

ChannelsList.propTypes = {
    children: React.PropTypes.node,
    accountId: React.PropTypes.string,
    loading: React.PropTypes.any,
};

export default ChannelsList;
