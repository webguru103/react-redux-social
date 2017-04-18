import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import theme from 'theme';

const PPLink = ({ children, color, ...props }) =>
  <Link {...props} style={{ color: color || theme.primaryColor, textDecoration: 'underline' }}>{children}</Link>

PPLink.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

export default PPLink;
