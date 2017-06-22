import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List } from 'immutable';

const mediaItemIcon = {
  file: 'a-file',
  link: 'fa-link',
  image: 'fa-photo',
  blog: 'fa-text',
  video: 'fa-video',
  text: 'fa-file-text-o',
};

const Wrapper = styled.div`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  border: ${(props) => (props.empty && '1px dashed #ACB5B8')};
  border-radius: 4px;
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
`;

function MediaItemThumb({ size, type, mediaItems }) {
  let faIcon;
  let empty = false;
  let imgUrl;
  if (mediaItems.size === 0) {
    empty = true;
    faIcon = mediaItemIcon[type];
  } else {
    imgUrl = mediaItems.getIn([0, 'properties', 'thumb_url']) || mediaItems.getIn([0, 'properties', 'picture']);
  }
  return (
    <Wrapper
      size={size}
      empty={empty}
      imgUrl={imgUrl}
    >
      { empty && <i className={`fa ${faIcon}`} /> }
    </Wrapper>
  );
}

MediaItemThumb.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
  mediaItems: ImmutablePropTypes.list,
};

MediaItemThumb.defaultProps = {
  mediaItems: new List(),
};

export default MediaItemThumb;
