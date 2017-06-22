import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

function SocialIcon({ icon }) {
  return <Wrapper className={icon} />;
}

SocialIcon.propTypes = {
  icon: PropTypes.string,
};

export default SocialIcon;
