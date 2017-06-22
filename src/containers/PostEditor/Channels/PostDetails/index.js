import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';
import PPButton from 'elements/atm.Button';

import FacebookBlock from 'containers/Feed/FacebookBlock';
import TwitterBlock from 'containers/Feed/TwitterBlock';
import LinkedInBlock from 'containers/Feed/LinkedInBlock';
import PinterestBlock from 'containers/Feed/PinterestBlock';

import MultiLineInput from 'components/MultiLineInput';
import Wrapper from './Wrapper';
import LimitIndicator from './LimitIndicator';

function getCreatorURL(url) {
  return url.substr(0, url.substr(0, url.length - 1).lastIndexOf('/') + 1);
}

function buildPostPreview(postData, postMessage, postTime, connection, mediaItems) {
  const post = postData.merge({
    message: postMessage,
    schedule_time: postTime,
  });
  // console.log('PostPreview post.toJS()', postData.toJS());
  // console.log('PostDetails connection', connection);
  let postToPreview = {};
  let type = '';
  let image = '';
  let video = '';

  if (mediaItems && mediaItems.length) {
    type = mediaItems[0].type;
    if (type === 'image') {
      image = mediaItems[0].properties.url;
    }
  } else {
    type = 'status';
  }

  // console.log('mediaItems', image);

  switch (connection.channel) {
    case 'facebook':
      postToPreview = {
        ...post.toJS(),
        created_time: {
          date: new Date(moment.unix(post.get('schedule_time'))),
        },
        type,
        full_picture: image,
      };
      return <FacebookBlock post={postToPreview} connection={connection} isPreview />;
    case 'twitter': {
      const mediaUrl = type === 'image' && image;
      const media = [{
        url: mediaUrl,
        media_url: mediaUrl,
      }];
      postToPreview = {
        ...post.toJS(),
        user: {
          ...connection.properties.profile,
        },
        created_at: new Date(moment.unix(post.get('schedule_time'))),
        entities: {
          media,
        },
        text: `${post.get('message')}${mediaUrl || ''}`,
      };
      return <TwitterBlock post={postToPreview} connection={connection} index="0" isPreview />;
    }
    case 'linkedin': {
      postToPreview = {
        ...post.toJS(),
        timestamp: new Date(moment.unix(post.get('schedule_time'))),
        updateContent: {
          companyStatusUpdate: {
            share: {
              comment: post.get('message'),
            },
          },
        },
      };
      return <LinkedInBlock post={postToPreview} connection={connection} isPreview />;
    }
    case 'pinterest': {
      postToPreview = {
        ...post.toJS(),
        created_at: new Date(moment.unix(post.get('schedule_time'))),
        image: {
          original: {
            url: type === 'image' && image,
          },
        },
        note: post.get('message'),
        creator: {
          first_name: connection.parent_display_name,
          url: getCreatorURL(connection.url),
        },
        board: {
          name: connection.properties.board_data.name,
          url: connection.properties.board_data.url,
        },
      };
      return <PinterestBlock post={postToPreview} isPreview />;
    }
    default:
      return null;
  }
}

function PostDetails({ post, postSet, postMessage, postTime, connection, handleRemoveSlot, handleDateChange, handleMessageChange, handleMessageBlur }) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  // console.log('PostDetails postSet', postSet.toJS());

  const characterCount = 140 - (postMessage ? postMessage.length : 0);
  return (
    <Wrapper>
      <div className="section-title">
        Schedule
        <PPButton className="remove-slot" onClick={() => handleRemoveSlot(post)}>
          Remove Slot
        </PPButton>
      </div>
      {post.get('status') !== '5' ?
        <div className="date-pickers">
          <div className="date-picker">
            <DatePicker minDate={minDate} value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
          </div>
          <div className="time-picker">
            <TimePicker format="ampm" value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
          </div>
        </div>
      :
        <div className="post-upon-ready-placeholder">This post will be sent when the status is set to Ready.</div>
      }
      <div className="section-title modify-content">
        Modify Content
        <LimitIndicator className={characterCount < 0 && 'negative'}>{characterCount}</LimitIndicator>
      </div>
      {/* <div className="channel-summary">
        <i className={connection.channel_icon} />
        <div className="summary-right">
          <span className="channel-name">{connection.display_name}</span>
          <span className="timestamp">
            {
              post.get('schedule_time')
              ? moment.unix(post.get('schedule_time')).format('MMMM D, YYYY [at] hh:mma')
              : 'Post when ready'
            }
          </span>
        </div>
      </div> */}
      <MultiLineInput
        hasBorder
        message={postMessage}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
      <div className="section-title post-preview-title">
        Preview Post
      </div>
      <div className="post-preview">
        {buildPostPreview(post, postMessage, postTime, connection, postSet.getIn(['details', 'media_items']).toJS())}
      </div>
    </Wrapper>
  );
}

PostDetails.propTypes = {
  post: ImmutablePropTypes.map,
  postSet: ImmutablePropTypes.map,
  connection: PropTypes.object,
  handleDateChange: PropTypes.func,
  handleMessageChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
  postMessage: PropTypes.string,
  postTime: PropTypes.string,
};

export default PostDetails;
