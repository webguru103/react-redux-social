import styled from 'styled-components';

const SmallImageWrapper = styled.img`
  background-color: #4A4A4A;
  border-radius: 4px;
  border: ${(props) => props.isSelected ? 'solid 1px' : 'none'};
  border-color: ${(props) => props.theme.primaryColor};
  width: 57px;
  height: 57px;
`;

export default SmallImageWrapper;
