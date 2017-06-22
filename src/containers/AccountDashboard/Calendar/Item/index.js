import React from 'react';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';

function Item({ post }) {
  const title = post.get('title') || 'Untitled';
  const scheduleTime = post.get('schedule_time');
  const time = moment(scheduleTime * 1000).format('MMMM D, Y, hh:mm a');
  const description = post.get('message');
  const mediaItems = (post.get('media_items').count() > 0 && post.get('media_items'));
  const image = (mediaItems && mediaItems.get(0).getIn(['properties', 'thumb_url'])) ||
    (mediaItems && mediaItems.get(0).getIn(['properties', 'picture']));
  const imgStyle = image ? '1px solid #E7ECEE' : '1px dashed #E7ECEE';

  return (
    <Wrapper>
      <td className="image">
        <div className="image-wrapper" style={{ border: imgStyle }}>
          {image ? <img role="presentation" className="thumbnail" src={image} /> :
          <i className="fa fa-file-text-o" aria-hidden="true"></i>}
        </div>
      </td>
      <td className="detail">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </td>
      <td className="date">{time}</td>
      <td className="channel"></td>
    </Wrapper>
  );
}

Item.propTypes = {
  post: ImmutablePropTypes.map,
};

export default Item;
