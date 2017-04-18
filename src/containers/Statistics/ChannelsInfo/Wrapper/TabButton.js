import React from 'react';
import styled from 'styled-components';

const TabButton = styled.button`
  /* Adjust the Button styling based on the theme */
  background: white;
  border: 0px solid ${(props) => props.theme.main || 'palevioletred'};

  color: #8f8f8f;
  border-radius: 3px;
  padding: 0.5em 2em;
  text-decoration: none;
  font-size: 1em;
  margin: 0 1em;
  
  :hover {
      background-color: #afafaf;
  }
`;

export default TabButton;