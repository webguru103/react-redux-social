import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PPDialog from 'elements/atm.Dialog';
import PPButton from 'elements/atm.Button';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';
import {
  selectPostSet,
} from 'containers/PostEditor/selectors';
import {
  submitPostsRequest,
} from 'containers/PostEditor/actions';
import ChannelsBlock from './ChannelsBlock';
import SchedulesBlock from './SchedulesBlock';
import Wrapper from './Wrapper';

class AddChannelSlotDialog extends Component {

  static propTypes = {
    active: PropTypes.bool,
    postSet: ImmutablePropTypes.map,
    handleDialogToggle: PropTypes.func,
    submitPosts: PropTypes.func,
  };

  state = {
    isPostUponReady: false,
    scheduleTimes: [new Date().getTime() + 300000],
    channels: [],
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      channels: nextProps.connections
        .filter((connection) => connection.channel !== 'wordpress')
        .map((connection) => ({
          checked: false,
          connection: fromJS(connection),
        })),
      isPostUponReady: false,
      scheduleTimes: [new Date().getTime() + 300000],
    });
  }

  onChangeScheduleTimes = (scheduleTimes) => {
    this.setState({ scheduleTimes });
  }

  onChangeChannelsState = (channels) => {
    this.setState({ channels });
  }

  submitPosts = () => {
    const { channels, isPostUponReady, scheduleTimes } = this.state;
    const { submitPosts, postSet, handleDialogToggle } = this.props;
    const posts = [];
    channels.forEach((channel) => {
      if (!channel.checked) return;
      if (isPostUponReady) {
        posts.push({
          connection_id: channel.connection.get('connection_id'),
          status: '5',
          schedule_time: 0,
          post_set_id: postSet.getIn(['details', 'post_set_id']),
          message: postSet.getIn(['details', 'message']),
        });
      } else {
        scheduleTimes.forEach((scheduleTime) => {
          posts.push({
            connection_id: channel.connection.get('connection_id'),
            status: '1',
            schedule_time: scheduleTime / 1000,
            post_set_id: postSet.getIn(['details', 'post_set_id']),
            message: postSet.getIn(['details', 'message']),
          });
        });
      }
    });
    submitPosts(posts);
    handleDialogToggle(false);
  }

  render() {
    const { active, handleDialogToggle } = this.props;
    const { isPostUponReady, scheduleTimes, channels } = this.state;
    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <Wrapper>
          <div className="heading">
            <div className="title">Schedule Post</div>
            <div className="close-button" onClick={handleDialogToggle}>×</div>
          </div>
          <div className="main-content">
            <div className="instruction">
              Set the date, time and channels.
            </div>
            <div className="post-style" onClick={() => this.setState({ isPostUponReady: !isPostUponReady })}>
              { isPostUponReady ? 'Schedule Post' : 'Post Instantly Upon Ready' }
            </div>
            {
              isPostUponReady ||
              <div className="schedules-block">
                <SchedulesBlock
                  onChangeScheduleTimes={this.onChangeScheduleTimes}
                  scheduleTimes={scheduleTimes}
                />
              </div>
            }
            {isPostUponReady &&
              <div className="instruction highlighted">
                This post will be sent instantly when the status is set to Ready.
              </div>
            }
            <div className="channels-block">
              <ChannelsBlock
                onChangeChannelsState={this.onChangeChannelsState}
                channels={channels}
              />
            </div>
          </div>
          <PPButton
            label="Schedule Selected Channels"
            className="schedule-selected-channels"
            onClick={this.submitPosts}
            primary
          />
        </Wrapper>
      </PPDialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    submitPosts: (posts) => dispatch(submitPostsRequest(posts)),
  };
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectAccountConnections(),
  postSet: selectPostSet(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelSlotDialog);
