import React, { PropTypes } from 'react';

import Wrapper from './Wrapper';
import imgLogin from './login_bg.png';
import imgSignup from './signup_bg.png';

const LeftPane = ({ children, signup = true }) => (
  <Wrapper backgroundImage={signup ? imgSignup : imgLogin}>
    <div style={{ position: 'relative', height: '100%' }}>
      { children }
    </div>
  </Wrapper>
);

LeftPane.propTypes = {
  children: PropTypes.node,
  signup: PropTypes.bool,
};

export default LeftPane;
