import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmoothCollapse from 'react-smooth-collapse';

import SocialIcon from 'elements/atm.SocialIcon';
import Heading from 'components/Heading';

import Wrapper from './Wrapper';

class ChannelsPreview extends Component {

  static propTypes = {
    connections: PropTypes.array,
    postSet: ImmutablePropTypes.map,
  };

  state = {
    isExpanded: true,
  };

  buildChannelList = () => {
    const { connections, postSet } = this.props;

    if (!connections || !postSet) return null;

    const uniqueChannels = {};
    postSet.getIn(['details', 'posts']).forEach((post) => {
      if (post.get('status') === '0') return;
      const connection = this.connectionFromId(post.get('connection_id'));
      uniqueChannels[connection.channel] = connection;
    });

    const channels = Object.keys(uniqueChannels);
    if (!channels || channels.length === 0) return <span>No channels chosen.</span>;

    const channelList = channels.map((channel) =>
      <SocialIcon icon={uniqueChannels[channel].channel_icon} />);
    return channelList;
  }

  connectionFromId = (id) => {
    const { connections } = this.props;
    return connections.find((c) => c.connection_id === id);
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  render() {
    const { isExpanded } = this.state;
    return (
      <Wrapper>
        <Heading
          title="Channels"
          icon="send-o"
          iconColor="#ABE66A"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <div style={{ paddingBottom: '16px', paddingTop: '10px' }}>
            {this.buildChannelList()}
          </div>
        </SmoothCollapse>
        <div style={{ marginTop: '-16px' }} />
      </Wrapper>
    );
  }
}

export default ChannelsPreview;
