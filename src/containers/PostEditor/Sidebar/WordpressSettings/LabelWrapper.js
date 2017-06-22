import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
  line-height: 15px;
  color: #8C9496;
`;
const RightLabelWrapper = styled.span`
  margin-left: 16px;
  font-size: 11px;
`;

const LabelWrapper = ({ children, rightLabel, ...props }) => (
  <Wrapper {...props}>
    { children }
    { rightLabel &&
      <RightLabelWrapper>
        { rightLabel }
      </RightLabelWrapper>
    }
  </Wrapper>
);

LabelWrapper.propTypes = {
  children: PropTypes.node,
  rightLabel: PropTypes.string,
};

LabelWrapper.defaultProps = {
  rightLabel: '',
};

export default LabelWrapper;
