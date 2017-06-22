import styled from 'styled-components';

const LimitIndicator = styled.span`
  font-size: 12px;
  color: #333;
  margin-right: 15px;
  float: right;
  &.negative {
    color: #e81c64;
  }
`;

export default LimitIndicator;
