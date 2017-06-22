import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectConnections,
} from 'containers/App/selectors';

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Channels extends Component {

  static propTypes = {
    postSet: ImmutablePropTypes.map,
    posts: PropTypes.array,
    connections: PropTypes.array,
    updatePost: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { posts, postSet } = props;
    const currentPost = Object.keys(posts).length && posts[Object.keys(posts)[0]][0];
    this.state = {
      currentPost,
      isDialogShown: false,
      postMessage: currentPost && currentPost.getIn(['properties', 'edited']) ? currentPost.get('message') : postSet.getIn(['details', 'message']),
      postTime: currentPost && currentPost.get('schedule_time'),
    };
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  handleClickTimestamp = (post) => {
    const { postSet } = this.props;
    this.setState({
      currentPost: post,
      postMessage: post.getIn(['properties', 'edited']) ? post.get('message') : postSet.getIn(['details', 'message']),
      postTime: post && post.get('schedule_time'),
    });
  }

  handleDateChange = (date) => {
    const { updatePost } = this.props;
    const { currentPost } = this.state;

    const newDate = new Date(date).getTime() / 1000;
    this.setState({
      postTime: newDate,
    });

    const newPost = {
      ...currentPost.toJS(),
      schedule_time: newDate,
    };
    updatePost(newPost);
  }

  handleMessageChange = (value) => {
    this.setState({
      postMessage: value,
    });
  }

  handleMessageBlur = () => {
    const { updatePost } = this.props;
    const { currentPost, postMessage } = this.state;
    // console.log('currentPost', currentPost.toJS());
    const newPost = {
      ...currentPost.toJS(),
      message: postMessage,
      properties: {
        edited: true,
      },
    };
    updatePost(newPost);
  }

  handleRemoveSlot = (postToDelete) => {
    const { updatePost } = this.props;
    const newPost = {
      ...postToDelete.toJS(),
      status: '0',
    };
    updatePost(newPost);
  }

  render() {
    const { postSet, connections, posts } = this.props;
    const { isDialogShown, currentPost, postMessage, postTime } = this.state;
    const hasContent = posts && Object.keys(posts).length && connections;
    const connection = connections && connections.filter((item) =>
      currentPost && item.connection_id === currentPost.get('connection_id'),
    )[0];
    const isBunchPosting = postSet.get('bunch_post_fetching');
    return (
      <Wrapper>
        <div className="left">
          <div className="title">Where to Post?</div>
          <PPButton
            label={
              <div>
                <span className="button-plus">+</span>
                <span className="button-title">Add Channel Slot</span>
              </div>
            }
            className="add-button"
            onClick={this.handleDialogToggle}
            primary
          />
          <div className="content">
            {hasContent ?
              <ChannelSlots
                posts={posts}
                connections={connections}
                handleClickTimestamp={this.handleClickTimestamp}
                handleRemoveSlot={this.handleRemoveSlot}
                currentPost={this.state.currentPost}
              />
            : <NoContent />
            }
          </div>
        </div>

        { hasContent && currentPost ?
          <div className="right">
            <PostDetails
              post={currentPost}
              postSet={postSet}
              postMessage={postMessage}
              postTime={postTime}
              connection={connection}
              handleMessageChange={this.handleMessageChange}
              handleMessageBlur={this.handleMessageBlur}
              handleRemoveSlot={this.handleRemoveSlot}
              handleDateChange={this.handleDateChange}
            />
          </div>
        :
          null
        }

        <AddChannelSlotDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
        />
        {isBunchPosting && <div className="overlay" />}
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectConnections(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
