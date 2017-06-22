import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import Wrapper from './Wrapper';
import StatusWrapper from './StatusWrapper';

function Item({ post }) {
  const title = post.get('title') || 'Untitled';
  const creationTime = post.get('creation_time');
  const time = moment(creationTime * 1000).format('M/D');
  const statusType = post.get('status');
  let statusLabel = '';

  switch (statusType) {
    case '2':
      statusLabel = 'Draft';
      break;
    case '5':
      statusLabel = 'In Review';
      break;
    default:
      statusLabel = 'Status';
      break;
  }

  return (
    <Wrapper>
      <th className="posts">{title}</th>
      <th className="date">{time}</th>
      <th className="status"><StatusWrapper type={statusType}>{statusLabel}</StatusWrapper></th>
    </Wrapper>
  );
}

Item.propTypes = {
  post: ImmutablePropTypes.map,
};

export default Item;
