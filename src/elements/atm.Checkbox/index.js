import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-toolbox/lib/checkbox';

import Wrapper from './Wrapper';

const PPCheckbox = ({
  marginBottom,
  bgColor,
  textColor,
  ...restProps
}) => (
  <Wrapper
    marginBottom={marginBottom}
    bgColor={bgColor}
    textColor={textColor}
  >
    <Checkbox
      className="pp-checkbox"
      {...restProps}
    />
  </Wrapper>
);

PPCheckbox.propTypes = {
  marginBottom: PropTypes.number,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

PPCheckbox.defaultProps = {
  marginBottom: 0,
  bgColor: '#E52466',
  textColor: '#616669',
};

export default PPCheckbox;
