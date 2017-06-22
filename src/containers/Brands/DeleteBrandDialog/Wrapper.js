import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Lato;
  width: 388px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 26px 30px;

    .title {
      color: #616669;
      font-size: 24px;
      font-weight: 900;
      line-height: 29px;
      padding: 0;
      margin: 0;
    }

    button {
      font-size: 16px;
      background: transparent;
      border: none;
      &:focus {
        outline: 0;
      }
    }
  }

  .divider {
    box-sizing: border-box;
    height: 1px;
    width: 100%;
    border: 1px solid #DBDFE0;
  }

  .body-wrapper {
    background-color: #F9FAFA;
    padding: 30px;

    .description-wrapper {
      padding-top: 30px;
      padding-left: 30px;

      p {
        color: #616669;
        font-size: 12px;
        line-height: 16px;
        padding: 0;
        margin-bottom: 20px;
      }
    }

    .button_wrapper {
      margin-top: 30px;
      display: flex;
      flex-direction: row-reverse;

      button {
        margin-left: 15px;
      }

      .cancel {
        background: transparent;
        border: none;
        &:focus {
          outline: 0;
        }
      }
    }
  }
`;

export default Wrapper;
