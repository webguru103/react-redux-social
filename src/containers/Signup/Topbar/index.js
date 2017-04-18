import React from 'react';
import { Link } from 'react-router';

import SimpleButton from 'elements/atm.SimpleButton';
import theme from 'theme';

import Wrapper from './Wrapper';

const Topbar = () => (<Wrapper color={theme.textColor}>
  Already have an account? <Link className="" to="/login" style={{ marginLeft: '40px' }}><SimpleButton color={theme.textColor}>Sign In</SimpleButton></Link>
</Wrapper>);

export default Topbar;
