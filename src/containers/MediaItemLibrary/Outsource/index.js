/*
 * Outsource
 *
 *
 */

import React from 'react';
import styled from 'styled-components';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

const Wrapper = styled.div`
  height:100%;
  width:100%;
`;

const Outsource = () => <Wrapper>In Blog View</Wrapper>;

export default UserCanAccount(Outsource);
