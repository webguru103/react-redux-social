import styled from 'styled-components';

const ToolbarButton = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  font-size: ${(props) => props.fontSize || '14'}px;
  color: #777;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  width: ${(props) => `${props.width}px` || '30px'};
  margin-left: ${(props) => `${props.marginLeft}px` || '0'};
  margin-right: ${(props) => `${props.marginRight}px` || '0'};
`;

export default ToolbarButton;
