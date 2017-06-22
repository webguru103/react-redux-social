import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserCanConnections } from 'config.routes/UserRoutePermissions';
import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';

import AddConnectionDialog from './AddConnectionDialog';
import ConnectionsControlBar from './ConnectionsControlBar';
import ConnectionsList from './ConnectionsList';
import {
  setChannelFilter,
  setChannelType,
  setConnectionsList,
  toggleDialog,
  getSocialUrl,
  removeConnection,
  connectionCallback,
  setSubCallback,
  setSubChannel,
  createSubChannels,
  clearSubData,
  getWordpressBlogs,
  validateConnections,
} from './actions';

import {
  makeSelectChannelFilter,
  makeSelectChannelType,
  makeSelectDialogShown,
  makeSelectSocialUrls,
  makeSelectSubCallback,
  makeSelectSubChannel,
  makeSelectSubChannels,
} from './selectors';

const styles = require('./styles.scss');

class Connections extends React.Component {
  constructor(props) {
    super(props);

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.setChannelFilter = this.setChannelFilter.bind(this);
    this.setChannelType = this.setChannelType.bind(this);
  }

  componentDidMount() {
    this.props.getSocialUrl();
    window.addEventListener('message', receiveMessage.bind(this), false);

    function receiveMessage(event) {
      if (event.origin.includes('dev2')) {
        this.props.connectionCallback(event.data);
      }
    }

    this.props.validateConnections(this.props.params.account_id);
  }

  setChannelFilter(channelFilter) {
    this.props.setChannelFilter(channelFilter);
  }

  setChannelType(channelType) {
    this.props.setChannelType(channelType);
  }

  getFilteredConnections() {
    return this.props.connections.filter((connection) => {
      let matched = true;

      if (this.props.channelFilter) {
        matched = matched && (connection.display_name.toLowerCase().indexOf(this.props.channelFilter.toLowerCase()) > -1);
      }

      if (this.props.channelType) {
        matched = matched && (connection.channel === this.props.channelType);
      }

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

  removeConnection(connectionId) {
    const connections = this.props.connections.slice();
    let connectionIndex;

    connections.forEach((connection, index) => {
      if (connection.connection_id === connectionId) {
        connectionIndex = index;
      }
    });

    if (connectionIndex !== undefined) {
      connections.splice(connectionIndex, 1);
    }
    this.props.removeChannel(connectionId);
    this.props.setConnectionsListShown(connections);
  }

  handleDialogToggle() {
    this.props.toggleDialogShown(!this.props.dialogShown);
    this.props.clearSubData();
  }

  render() {
    return (
      <div className={styles.containerDiv} >
        <ConnectionsControlBar
          handleDialogToggle={this.handleDialogToggle} channels={this.getChannelTypes()}
          setChannelFilter={this.setChannelFilter} setChannelType={this.setChannelType}
          channelFilter={this.props.channelFilter} channelType={this.props.channelType}
        />
        <ConnectionsList getSubConnections={this.getSubConnections} connections={this.getFilteredConnections()} removeConnection={this.removeConnection} />
        <AddConnectionDialog
          getWordpressBlogs={this.props.getWordpressBlogs} createSubChannels={this.props.createSubChannels}
          subChannels={this.props.subChannels} setSubChannel={this.props.setSubChannel} subChannel={this.props.subChannel}
          setSubCallback={this.props.setSubCallback} subCallback={this.props.subCallback} handleDialogToggle={this.handleDialogToggle}
          dialogShown={this.props.dialogShown} socialUrls={this.props.socialUrls}
        />
      </div>
    );
  }
}

Connections.propTypes = {
  getSocialUrl: React.PropTypes.func,
  connectionCallback: React.PropTypes.func,
  dialogShown: React.PropTypes.bool,
  clearSubData: React.PropTypes.func,
  connections: React.PropTypes.array,
  toggleDialogShown: React.PropTypes.func,
  removeChannel: React.PropTypes.func,
  setConnectionsListShown: React.PropTypes.func,
  setChannelFilter: React.PropTypes.func,
  setChannelType: React.PropTypes.func,
  socialUrls: React.PropTypes.object,
  subCallback: React.PropTypes.bool,
  setSubCallback: React.PropTypes.func,
  subChannels: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  createSubChannels: React.PropTypes.func,
  getWordpressBlogs: React.PropTypes.func,
  channelType: React.PropTypes.string,
  channelFilter: React.PropTypes.string,
  setSubChannel: React.PropTypes.func,
  subChannel: React.PropTypes.object,
  validateConnections: React.PropTypes.func,
  params: React.PropTypes.shape({
    account_id: React.PropTypes.string,
  }),
};

export function mapDispatchToProps(dispatch) {
  return {
    setChannelFilter: (channelFilter) => dispatch(setChannelFilter(channelFilter)),
    setChannelType: (channelType) => dispatch(setChannelType(channelType)),
    setConnectionsListShown: (connections) => dispatch(setConnectionsList(connections)),
    toggleDialogShown: (isShown) => dispatch(toggleDialog(isShown)),
    getSocialUrl: () => dispatch(getSocialUrl()),
    removeChannel: (channelId) => dispatch(removeConnection(channelId)),
    connectionCallback: (channelObject) => dispatch(connectionCallback(channelObject)),
    setSubCallback: (sub) => dispatch(setSubCallback(sub)),
    setSubChannel: (subChannel) => dispatch(setSubChannel(subChannel)),
    createSubChannels: (data) => dispatch(createSubChannels(data)),
    clearSubData: () => dispatch(clearSubData()),
    getWordpressBlogs: (data) => dispatch(getWordpressBlogs(data)),
    validateConnections: (id) => dispatch(validateConnections(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  channelFilter: makeSelectChannelFilter(),
  channelType: makeSelectChannelType(),
  connections: makeSelectAccountConnections(),
  dialogShown: makeSelectDialogShown(),
  socialUrls: makeSelectSocialUrls(),
  subCallback: makeSelectSubCallback(),
  subChannel: makeSelectSubChannel(),
  subChannels: makeSelectSubChannels(),
});

export default UserCanConnections(connect(mapStateToProps, mapDispatchToProps)(Connections));
