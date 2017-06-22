import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import Logo from './powerpost_logo.png';

const CustomLink = ({ isAccountPath, ...rest }) => (
  <Link {...rest}>
    {rest.children}
  </Link>
);

const Wrapper = styled(CustomLink)`
  display: ${(props) => props.isAccountPath ? 'none' : 'block'};
  height: 100%;
  float: left;
  line-height: 60px;
  margin-left: 15px;
`;

const PPLogo = (props) =>
  <Wrapper to="/" {...props}>
    <img src={Logo} alt="PowerPost Logo" />
  </Wrapper>;


export default PPLogo;
