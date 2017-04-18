/*
 * Statistics
 * Analytics Info for Social Channels.
 * i.e. Facebook, LinkedIn, Twitter, Pinterest
 */

import React from 'react';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanStatistics } from 'config.routes/UserRoutePermissions';

import ChannelsList from './ChannelsList';

import {
    setChannelFilter,
    setChannelType,
    setConnectionsList,
    toggleDialog,
    getAccountId,
} from './actions';

import {
    makeSelectChannelFilter,
    makeSelectChannelType,
    makeSelectDialogShown,
    makeSelectAccountId,
} from './selectors';

import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';

class Statistics extends React.Component {
    constructor(props) {
        super(props);

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.setChannelFilter = this.setChannelFilter.bind(this);
        this.setChannelType = this.setChannelType.bind(this);
    }
    
    componentDidMount() {
        this.props.getAccountId();
    }
    
    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    setChannelFilter(channelFilter) {
        this.props.setChannelFilter(channelFilter);
    }

    setChannelType(channelType) {
        this.props.setChannelType(channelType);
    }

    getFilteredConnections () {
        return this.props.connections.filter(connection => {
            let matched = true;

            if(this.props.channelFilter) {
                matched = matched && (connection.display_name.toLowerCase().indexOf(this.props.channelFilter.toLowerCase()) > -1);
            }

            if(this.props.channelType) {
                matched = matched && (connection.channel === this.props.channelType);
            }

            return matched;
        });
    }

    getChannelTypes () {
        let types = [];

        this.props.connections.forEach(connection => {
            if(types.indexOf(connection.channel) === -1) {
                types.push(connection.channel);
            }
        });

        types.sort();
        return types;
    }

    render() {

        return (
            <div>
                <ChannelsList
                    connections={this.getFilteredConnections()}
                    accountId={ this.props.params.account_id }
                    loading={ this.props.children }
                    handleDialogToggle={this.handleDialogToggle}
                    channels={this.getChannelTypes()}
                    setChannelFilter={this.setChannelFilter}
                    setChannelType={this.setChannelType}
                    channelFilter={this.props.channelFilter}
                    channelType={this.props.channelType}
                />
            </div>
        );
    }
}

Statistics.propTypes = {
    children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
    return {
        setChannelFilter: channelFilter => dispatch(setChannelFilter(channelFilter)),
        setChannelType: channelType => dispatch(setChannelType(channelType)),
        setConnectionsListShown: connections => dispatch(setConnectionsList(connections)),
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown)),
        getAccountId: () => dispatch(getAccountId()),
    };
}

const mapStateToProps = createStructuredSelector({
    channelFilter: makeSelectChannelFilter(),
    channelType: makeSelectChannelType(),
    connections: makeSelectAccountConnections(),
    dialogShown: makeSelectDialogShown(),
    accountId: makeSelectAccountId(),
});

export default UserCanStatistics(connect(mapStateToProps, mapDispatchToProps)(Statistics));
