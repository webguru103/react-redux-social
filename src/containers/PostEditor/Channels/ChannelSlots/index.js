/* eslint-disable no-restricted-syntax */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { differenceWith, isEqual } from 'lodash';

import Wrapper from './Wrapper';
import ChannelSlot from './ChannelSlot';

class ChannelSlots extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { posts } = this.props;
    let oneSlotDeleted = false;
    if (nextProps.posts !== posts) {
      let newPostItem;
      if (Object.keys(nextProps.posts).length > Object.keys(posts).length) {
        Object.keys(nextProps.posts).map((connectionId) => {
          if (!posts[connectionId]) newPostItem = nextProps.posts[connectionId];
          return true;
        });
      } else if (Object.keys(nextProps.posts).length < Object.keys(posts).length) {
        for (const connectionId in nextProps.posts) {
          if (posts[connectionId]) {
            newPostItem = nextProps.posts[connectionId];
            break;
          }
        }
      } else {
        for (const connectionId in nextProps.posts) {
          if (nextProps.posts[connectionId].length > posts[connectionId].length) {
            newPostItem = differenceWith(nextProps.posts[connectionId], posts[connectionId], isEqual);
            break;
          } else if (nextProps.posts[connectionId].length < posts[connectionId].length) {
            oneSlotDeleted = true;
            break;
          }
        }

        if (oneSlotDeleted) {
          for (const connectionId in nextProps.posts) {
            // Making sure new posts have at least one slot
            if (nextProps.posts[connectionId].length > 0) {
              newPostItem = nextProps.posts[connectionId];
              break;
            }
          }
        }
      }
      if (newPostItem) this.props.handleClickTimestamp(newPostItem[0]);
    }
  }

  render() {
    const { posts, connections, handleClickTimestamp, handleRemoveSlot, currentPost } = this.props;
    return (
      <Wrapper>
        {
          Object.keys(posts).map((connectionId) => {
            const postItems = posts[connectionId];
            const connection = connections.filter((item) =>
              item.connection_id === connectionId,
            )[0];

            if (!connection || postItems.length === 0 || connection.channel === 'wordpress') return null;

            return (
              <ChannelSlot
                postItems={postItems}
                connection={connection}
                handleClickTimestamp={handleClickTimestamp}
                handleRemoveSlot={handleRemoveSlot}
                currentPost={currentPost}
              />
            );
          })
        }
      </Wrapper>
    );
  }
}

ChannelSlots.propTypes = {
  currentPost: ImmutablePropTypes.map,
  posts: PropTypes.array,
  connections: PropTypes.array,
  handleClickTimestamp: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
};

export default ChannelSlots;
