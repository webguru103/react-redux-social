import React from 'react';
import PropTypes from 'prop-types';

import MediaItemPreview from 'components/MediaItemPreview';

import Wrapper from './Wrapper';

function PostContent({ creationTime, message, mediaItems }) {
  return (
    <Wrapper>
      <div className="time">{creationTime}</div>
      <div className="description">{message}</div>
      <div className="mediaContent">
        <MediaItemPreview mediaItems={mediaItems} />
      </div>
    </Wrapper>
  );
}

PostContent.propTypes = {
  creationTime: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  mediaItems: PropTypes.arrayOf(PropTypes.shape),
};

export default PostContent;
