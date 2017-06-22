import React, { PropTypes } from 'react';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import Wrapper from './Wrapper';
import Topbar from './Topbar';
import FormWrapper from './FormWrapper';

const Login = ({ children }) => (
  <Wrapper>
    <LeftPane signup={false}>
      <img src={imgLogo} alt="Logo" />
      <div style={{ position: 'absolute', left: 0, bottom: '80px' }}>
        <div style={{ fontSize: '2rem' }}>Power Your Knowledge</div>
        <div style={{ marginTop: '10px', fontSize: '3.5rem', lineHeight: 1.1 }}>3 Ways to User a GoPro for Content Creation</div>
        <div style={{ marginTop: '15px', fontSize: '1.5rem' }}>
          Want to learn how it can work for you, too?
          <br /><br />
          Read this article
        </div>
      </div>
    </LeftPane>
    <RightPane>
      <Topbar />
      <FormWrapper>
        { children }
      </FormWrapper>
    </RightPane>
  </Wrapper>
);

Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
