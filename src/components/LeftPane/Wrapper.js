import styled from 'styled-components';

export default styled.div`
  width: 504px;
  height: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  color: white;
  padding: 40px;
`;
