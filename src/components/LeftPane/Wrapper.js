import styled from 'styled-components';

export default styled.div`
  width: 504px;
  @media(max-width: 768px) {
    width: 0;
    display: none;
  }
  height: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  color: white;
  padding: 40px;
  overflow-y: auto;

  & > div {
    min-height: 600px;
  }
`;
