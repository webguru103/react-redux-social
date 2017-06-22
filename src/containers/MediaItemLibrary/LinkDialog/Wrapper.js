import styled from 'styled-components';

const Wrapper = styled.div`
  width: 624px;
  background-color: #FFFFFF;
  padding: 40px;
  font-family: Lato;

  .header-info {
    display: flex;
    justify-content: space-between;
    h3 {
      height: 24px;
      color: #6F6F6F;
      font-size: 20px;
      line-height: 24px;
      margin: 0;
      padding: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-right: 30px;

      span {
        padding-right: 10px;
        height: 14px;
        color: #8C9496;
        font-size: 14px;
        line-height: 14px;
        text-align: right;

        i {
          font-family: FontAwesome;
          font-size: 16px;
        }
      }
    }

    button {
      background: transparent;
      border: none;
      font-size: 24px;
      line-height: 27px;
      color: #888888;
      margin-top: -5px;
      &:focus {
        outline: 0;
      }
    }
  }

  .info-wrapper {
    flex: 0.8;
    margin: 20px;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

export default Wrapper;
