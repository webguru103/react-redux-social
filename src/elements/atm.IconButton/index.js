import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';

const PPIconButton = (props) => {
  const { style } = props;
    // remove non-material UI props
  const { inBar, ...newProps } = props;

  let additionalStyles = {
    border: 'solid 1px #CFD8DC',
    borderRadius: '4px',
    marginLeft: '10px',
    marginRight: '10px',
    height: '32px',
    width: '32px',
    padding: '5px',
  };

  if (inBar) {
    additionalStyles = {
      border: 'solid 1px #CFD8DC',
      borderRadius: '4px',
      marginLeft: '10px',
      marginRight: '10px',
      height: '32px',
      width: '32px',
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      padding: '5px',
    };
  }

  return (
    <IconButton {...newProps} style={{ ...style, ...additionalStyles }} iconStyle={{ color: '#888888', width: '20px', height: '20px' }} />
  );
};

PPIconButton.propTypes = {
  children: PropTypes.node, // Can be used to pass a FontIcon element as the icon for the button.
  className: PropTypes.string, // The CSS class name of the root element.
  disableTouchRipple: PropTypes.bool, // false If true, the element's ripple effect will be disabled.
  disabled: PropTypes.bool, // false If true, the element will be disabled.
  hoveredStyle: PropTypes.object, // Override the inline-styles of the root element when the component is hovered.
  href: PropTypes.string, // The URL to link to when the button is clicked.
  iconClassName: PropTypes.string, // The CSS class name of the icon. Used for setting the icon with a stylesheet.
  iconStyle: PropTypes.object, // {} Override the inline-styles of the icon element. Note: you can specify iconHoverColor as a String inside this object.
  onKeyboardFocus: PropTypes.func, // Callback function fired when the element is focused or blurred by the keyboard.
  style: PropTypes.object, // Override the inline-styles of the root element.
  tooltip: PropTypes.node, // The text to supply to the element's tooltip.
  tooltipStyles: PropTypes.object, // Override the inline-styles of the tooltip element.
  touch: PropTypes.bool, // false If true, increase the tooltip element's size. Useful for increasing tooltip readability on mobile devices.
  inBar: PropTypes.bool,
};

export default PPIconButton;
