import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const PPFloatingActionButton = (props) => <FloatingActionButton {...props} />;

PPFloatingActionButton.PropTypes = {
  backgroundColor: PropTypes.string, // Override the default background color for the button, but not the default disabled background color (use disabledBackgroundColor for this).
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  href: PropTypes.string,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.object,
  mini: PropTypes.bool,
  secondary: PropTypes.bool,
  style: PropTypes.object,
  zDepth: PropTypes.zDepth,
};

export default PPFloatingActionButton;
