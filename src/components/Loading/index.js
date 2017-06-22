import React, { PropTypes } from 'react';
import ReactLoading from 'react-loading';

import theme from 'theme';

import Wrapper from './Wrapper';

const Loading = ({ type, color }) => (
  <Wrapper>
    <ReactLoading type={type || 'spin'} color={color || theme.primaryColor} />
  </Wrapper>
);

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  type: '',
  color: '',
};

export default Loading;
