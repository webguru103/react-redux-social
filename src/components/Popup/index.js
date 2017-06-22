import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import { noop } from 'lodash';

const Wrapper = styled.div`
  padding: 10px 0;
  position: absolute;
  background: white;
  z-index: 10;
  top: ${(props) => props.top}px;
  left: -10px;
  -webkit-filter: drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  filter        : drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  -ms-filter    : "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=1, Color='#383C5C81')";

  &:after {
    content: '';
    display: block;  
    position: absolute;
    left: 20px;
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
    top: PropTypes.number,
    children: PropTypes.node,
    onOutsideClick: PropTypes.func,
  }

  static defaultProps = {
    top: 30,
    onOutsideClick: noop,
  }

  handleClickOutside = (e) => {
    this.props.onOutsideClick(e);
  }

  render() {
    const { top } = this.props;

    return (
      <Wrapper top={top}>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(Popup);
