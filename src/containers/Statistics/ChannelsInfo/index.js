import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';

import {
  makeSelectCurrentChannel,
  makeLodingChannel,
} from './selectors';
import {
  fetchCurrentChannel,
  fetchCurrentChannelSuccess,
} from './actions';
import MainInfo from './MainInfo';
import ChannelLoading from '../Loading';
import SubWrapper from './SubWrapper';
import Wrapper from './MainWrapper';

const engagementTabsList = {
  twitter: ['tweets', 'retweets', 'favorites'],
  facebook: ['posts', 'fans', 'impressions', 'likes', 'comments'],
  pinterest: ['pins', 're-pins', 'likes', 'comments'],
  linkedin: ['posts', 'likes', 'comments'],
};

class ChannelsInfo extends React.Component {
  static propTypes = {
    activeChannel: PropTypes.any,
    connections: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    fetchChannel: PropTypes.func,
    fetchChannelInfo: PropTypes.func,
    params: PropTypes.shape({
      account_id: PropTypes.string,
      channel_id: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
  }

  state = { subChannel: '', isMonth: false };

  componentDidMount() {
    const { params, fetchChannel } = this.props;
    fetchChannel(params.channel_id);
  }

  componentWillReceiveProps(nextProps) {
    const { activeChannel, fetchChannel, fetchChannelInfo, params } = this.props;
    if (nextProps.params.channel_id !== params.channel_id || nextProps.params.account_id !== params.account_id) {
      document.getElementById('main-panel').scrollTop = 0;
      fetchChannel(nextProps.params.channel_id);
    }
    if (nextProps.activeChannel !== activeChannel) {
      fetchChannelInfo(nextProps.activeChannel);
      this.setState({ subChannel: engagementTabsList[nextProps.activeChannel.getIn(['connection', 'channel'])][0] });
    }
  }

  getType(channel) {
    return channel.type.split('_')[1];
  }

  setInfo(channel) {
    let keys;
    let last;
    let info;
    const { activeChannel } = this.props;
    const rules = {
      pinterest: [
        { info: 'analytics.pins_by_month', key: 'comments', label: 'Followers' },
        { info: 'analytics.pins_by_month', key: 'pin_count', label: 'Pins' },
        { info: 'analytics.pins_by_month', key: 'repins', label: 'Repins' },
        { info: 'analytics.pins_by_month', key: 'likes', label: 'Likes' },
        { info: 'analytics.pins_by_month', key: 'comments', label: 'Comments' },
      ],
      twitter: [
        { info: 'analytics.user_stats.statuses_count', direct: true, label: 'Tweets' },
        { info: 'analytics.user_stats.listed_count', direct: true, label: 'Retweets' },
        { info: 'analytics.user_stats.followers_count', direct: true, label: 'Followers' },
        { info: 'analytics.user_stats.friends_count', direct: true, label: 'Following' },
        { info: 'analytics.user_stats.favorites_count', direct: true, label: 'Favorites' },
      ],
      linkedin: [
        { info: 'analytics.total_followers_by_month', label: 'Followers' },
      ],
      facebook: [
        { info: 'analytics.extended.page_fans_by_month', label: 'Fans' },
      ],
    }[channel];
    return rules.map((rule) => {
      if (rule) {
        if (rule.direct) {
          return (
            <div className="infoWidth" key={rule.label}>
              <h3 className="topItemValue">{(activeChannel.getIn(rule.info.split('.')) || 0).toLocaleString()}</h3>
              <h6 className="topItemLabel">{rule.label}</h6>
            </div>
          );
        }
        info = activeChannel.getIn(rule.info.split('.'));
        if (info) {
          keys = Object.keys(info.toJS());
          last = keys[0];
          if (last != null) {
            return (
              <div className="infoWidth" key={rule.label}>
                <h3 className="topItemValue">{((rule.key ? info.getIn([last, rule.key]) : info.get(last)) || 0).toLocaleString()}</h3>
                <h6 className="topItemLabel">{rule.label}</h6>
              </div>
            );
          }
        }
        return (
          <div className="infoWidth" key={rule.label}>
            <h3 className="topItemValue">0</h3>
            <h6 className="topItemLabel">{rule.label}</h6>
          </div>
        );
      }
      return null;
    });
  }

  renderLoading(channel) {
    return (
      <div>
        <ChannelLoading channel={channel} />
      </div>
    );
  }

  renderMain(channel) {
    const engagementTabs = engagementTabsList[channel.channel];
    if (!engagementTabs) return 'Error Fetching Data';
    return (
      <div>
        <div className="basicInfo">
          <div className={`tablewidth ${channel.channel === 'facebook' || channel.channel === 'linkedin' ? 'short' : ''}`}>
            <div className="tbody">
              <div className="activeWidth">
                <div className="connectionBlock">
                  <div className="connectionIcon">
                    <i className={`${channel.channel_icon} ${channel.channel}`}></i>
                  </div>
                  <div style={{ float: 'left', textAlign: 'left' }}>
                    <div className="connectionName">
                      {channel.display_name}
                    </div>
                    <div className={channel.channel}>
                      {this.getType(channel)[0].toUpperCase() + this.getType(channel).slice(1)}
                    </div>
                  </div>
                </div>
              </div>
              {this.setInfo(channel.channel)}
            </div>
          </div>
        </div>
        <div className="channelsinfo">
          <h3 className="paddingleft">Engagement</h3>
          <div className="infoTab">
            {
              engagementTabs.map((tab) =>
                <Link key={tab} className={`infoTabItem ${this.state.subChannel === tab ? 'activeBorderline' : ''}`} onClick={() => this.setState({ subChannel: tab })}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Link>,
              )
            }
            <SubWrapper>
              <Link className={`infoTabItem ${this.state.isMonth ? '' : 'darken'}`} onClick={() => this.setState({ isMonth: false })}>Weekly</Link>
              <Link className={`infoTabItem ${this.state.isMonth ? 'darken' : ''}`} onClick={() => this.setState({ isMonth: true })}>Monthly</Link>
            </SubWrapper>
          </div>
          <div className="mainInfo" >
            <MainInfo activeChannel={this.props.activeChannel} subChannel={this.state.subChannel} isMonth={this.state.isMonth} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { params, connections, isLoading } = this.props;
    const channelId = params.channel_id;
    let channel = {};
    channel = connections.filter((connection) =>
      connection.connection_id === channelId
    )[0] || {};
    if (isLoading === true) {
      return (
        <Wrapper>
          {this.renderLoading(channel)}
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {this.renderMain(channel)}
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannel: (channelId) => dispatch(fetchCurrentChannel(channelId)),
    fetchChannelInfo: (channel) => dispatch(fetchCurrentChannelSuccess(channel)),
  };
}

const mapStateToProps = createStructuredSelector({
  activeChannel: makeSelectCurrentChannel(),
  isLoading: makeLodingChannel(),
  connections: makeSelectAccountConnections(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(ChannelsInfo));
