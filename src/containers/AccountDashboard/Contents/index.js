import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function renderItem(item) {
  const image = (item.getIn(['properties', 'thumb_url'])) ||
    item.getIn(['properties', 'picture']);
  const mediaType = item.get('type');
  let iconName = '';

  switch (mediaType) {
    case 'link':
      iconName = 'fa fa-link';
      break;
    case 'video':
      iconName = 'fa fa-video-camera';
      break;
    case 'image':
      iconName = 'fa fa-picture-o';
      break;
    case 'file':
      iconName = 'fa fa-text-o';
      break;
    case 'document':
      iconName = 'fa fa-file-text-o';
      break;
    default:
      iconName = 'fa fa-file-text-o';
      break;
  }

  return image ? <img role="presentation" src={image} /> : <i className={iconName} />;
}

function Contents({ mediaItems, path }) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div className="title">Content</div>
        <div className="description">Upload, curate and create content and organize it all in one place.</div>
      </HeaderWrapper>
      <div className="content-wrapper">
        {mediaItems && mediaItems.map((item) =>
          <div className="item">{renderItem(item)}</div>
        )}
      </div>
      <div className="bottom-wrapper">
        <Link to={path}>
          <GoTo style={{ color: '#616669' }}>
            <span>View All</span><i className="fa fa-chevron-right" />
          </GoTo>
        </Link>
      </div>
    </Wrapper>
  );
}

Contents.propTypes = {
  mediaItems: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default Contents;
