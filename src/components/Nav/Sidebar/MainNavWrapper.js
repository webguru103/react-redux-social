import styled from 'styled-components';

const MainNavWrapper = styled.div`
  width: 216px;
  position: absolute;
  left: 0px;
  height: 100%;
  background-color: #F8FAFA;
  color: #8C9497;
  border-right: solid 1px #C8CED0;
  display: ${(props) => props.isCollapsed ? 'none' : 'block'};
`;

export default MainNavWrapper;
