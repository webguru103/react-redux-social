import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

const Wrapper = styled.div`
  padding: 10px 0;
  position: absolute;
  background: white;
  z-index: 10;
  top: 30px;
  right: 10px;
  -webkit-filter: drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  filter        : drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  -ms-filter    : "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=1, Color='#383C5C81')";

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 10px;
    bottom: 100%;
    width: 0;
    height: 0;
    border-bottom: 10px solid white;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

class Popup extends Component {
  static propTypes = {
    children: PropTypes.node,
    onOutsideClick: PropTypes.func,
  }

  handleClickOutside = (e) => {
    this.props.onOutsideClick(e);
  }

  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(Popup);
