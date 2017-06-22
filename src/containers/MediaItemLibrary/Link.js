import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.a`
    border-bottom: ${(props) => props.active ? '2px solid #E52466' : 'none'};
    color: ${(props) => props.active ? '#4A4A4A' : '#888888'};
    padding-left: 10px;
    padding-right: 10px;
    font-size: 13px;
    padding-bottom: 21px;
    display: inline-block;
    font-weight: 700;
    padding-top: 20px;
    font-family: 'Lato';
    font-size: 13px;
    letter-spacing: 0;
    line-height: 17px;
    margin-left: 10px;
    margin-right: 10px;
    
    &:hover, &:active {
        color: #4A4A4A;
        text-decoration: none;
    }
`;

const Link = ({ active, children, onClick }) => {
  return (
    <Wrapper active={active} href="#"
       onClick={e => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
    </Wrapper>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
