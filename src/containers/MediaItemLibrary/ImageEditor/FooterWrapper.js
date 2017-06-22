import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: Lato;
  .gallery {
    flex: 1;
    p {
      height: 15px;
      color: #8C9496;
      font-weight: bold;
      line-height: 15px;
      font-size: 12px;
    }
    div {
      display: flex;
    }
  }
  .button-wrapper {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
`;

export default FooterWrapper;
