import styled from 'styled-components';

export default styled.div`
  background: url(${(props) => props.image}) no-repeat center center fixed; 
  -webkit-background-size: cover;
     -moz-background-size: cover;
       -o-background-size: cover;
          background-size: cover;
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

