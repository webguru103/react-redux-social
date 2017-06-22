import styled from 'styled-components';

const Wrapper = styled.div`
  width: 324px;
  border-radius: 4px;
  background-color: #FFFFFF;
  padding: 24px;
  font-family: Lato;
  flex: 1;

  .info-wrapper {
    display: flex;
    .avatar-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 3px;
      background-color: #1ED760;
      border: none;
    }

    .title {
      margin-left: 24px;
      margin-top: 5px;
      p {
        margin: 0;
        padding: 0;
      }
      .name {
        color: #6F6F6F;
        font-size: 20px;
        font-weight: normal;
      }
      .site {
        color: #8C9496;
        font-size: 14px;
      }
    }
  }

  .caption {
    margin-top: 27px;
    color: #616669;
    font-size: 12px;
    line-height: 15px;
    padding: 0;
  }
`;

export default Wrapper;
