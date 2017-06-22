import styled from 'styled-components';

const Wrapper = styled.div`
  width: 324px;
  flex: 1;
  margin-top: 24px;
  h3 {
    color: #8C9496;
    font-family: Lato;
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    padding: 0;
    margin: 0;
  }
  .tabs {
    margin-top: 20px;
    i {
      font-size: 24px;
      margin-right: 16px;
    }
    .fa-facebook-square {
      color: #39579A;
    }
    .fa-twitter-square {
      color: #44ABF6;
    }
    .fa-linkedin-square {
      color: #2278B8;
    }
    .fa-pinterest-square {
      color: #BD081C;
    }
  }
`;

export default Wrapper;
