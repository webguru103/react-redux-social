import React, { PropTypes } from 'react';

import Wrapper from './Wrapper';
import imgBackground from './signup_bg.png';

const LeftPane = ({ children }) => (
  <Wrapper backgroundImage={imgBackground}>
    <div style={{ position: 'relative', height: '100%' }}>
      { children }
    </div>
  </Wrapper>
);

LeftPane.propTypes = {
  children: PropTypes.node,
};

export default LeftPane;
