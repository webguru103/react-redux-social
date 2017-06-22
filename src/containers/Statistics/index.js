 /*
 * Statistics
 * Analytics Info for Social Channels.
 * i.e. Facebook, LinkedIn, Twitter, Pinterest
 */

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { UserCanStatistics } from 'config.routes/UserRoutePermissions';
import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';

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

class Statistics extends React.Component {

  static propTypes = {
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        display_name: PropTypes.string,
        channel: PropTypes.string,
      })
    ).isRequired,
    params: PropTypes.shape({
      account_id: PropTypes.string,
    }).isRequired,
    channelFilter: PropTypes.string,
    channelType: PropTypes.string,
    dialogShown: PropTypes.bool,
    children: PropTypes.node,
    getAccountId: PropTypes.func.isRequired,
    toggleDialogShown: PropTypes.func.isRequired,
    setChannelFilter: PropTypes.func.isRequired,
    setChannelType: PropTypes.func.isRequired,
    router: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.setChannelFilter = this.setChannelFilter.bind(this);
    this.setChannelType = this.setChannelType.bind(this);
  }

  componentDidMount() {
    this.props.getAccountId();
    const { router } = this.props;
    const connections = this.getFilteredConnections(this.props.connections);
    if (!router.params.channel_id && connections.length) {
      browserHistory.push(`${router.location.pathname.replace(/\/$/, '')}/${connections[0].connection_id}`);
    }
  }

  getFilteredConnections(connections) {
    const { channelFilter, channelType } = this.props;
    return connections.filter((connection) => {
      let matched = true;
      if (connection.status !== '1') {
        return false;
      }

      if (channelFilter) {
        matched = matched && (connection.display_name.toLowerCase().indexOf(channelFilter.toLowerCase()) > -1);
      }

      if (channelType) {
        matched = matched && (connection.channel === channelType);
      }

      if (connection.type === 'facebook_profile') return false;
      return matched;
    });
  }

  getChannelTypes() {
    const types = [];

    this.props.connections.forEach((connection) => {
      if (types.indexOf(connection.channel) === -1) {
        types.push(connection.channel);
      }
    });

    types.sort();
    return types;
  }

  setChannelFilter(channelFilter) {
    this.props.setChannelFilter(channelFilter);
  }

  setChannelType(channelType) {
    this.props.setChannelType(channelType);
  }

  handleDialogToggle() {
    const { toggleDialogShown, dialogShown } = this.props;
    toggleDialogShown(!dialogShown);
  }

  render() {
    const { params, children, connections } = this.props;
    return (
      <div>
        <ChannelsList
          connections={this.getFilteredConnections(connections)}
          accountId={params.account_id}
          loading={children}
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

export function mapDispatchToProps(dispatch) {
  return {
    setChannelFilter: (channelFilter) => dispatch(setChannelFilter(channelFilter)),
    setChannelType: (channelType) => dispatch(setChannelType(channelType)),
    setConnectionsListShown: (connections) => dispatch(setConnectionsList(connections)),
    toggleDialogShown: (isShown) => dispatch(toggleDialog(isShown)),
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
