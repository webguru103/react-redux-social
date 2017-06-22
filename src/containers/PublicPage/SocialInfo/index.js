import React from 'react';
import PropTypes from 'prop-types';

import PPAvatar from 'elements/atm.Avatar';

import Wrapper from './Wrapper';

function SocialInfo({ url, websiteUrl, title, color, description }) {
  return (
    <Wrapper>
      <div className="info-wrapper">
        <div className="avatar-wrapper">
          <PPAvatar
            size={64}
            image={url}
            title={title}
            backgroundColor={color}
            isClickable={false}
          />
        </div>
        <div className="title">
          <p className="name">{title}</p>
          <p className="site">{websiteUrl}</p>
        </div>
      </div>
      <div className="caption">
        {description}
      </div>
    </Wrapper>
  );
}

SocialInfo.propTypes = {
  url: PropTypes.string.isRequired,
  websiteUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SocialInfo;
