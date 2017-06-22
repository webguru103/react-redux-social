import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  border-bottom: ${(props) => props.last ? 'none' : '1px solid #CFD8DC'};
  padding-bottom: 32px;
  margin-bottom: 32px;

  h3 {
    color: #888888;
  }

  div.head {
    width: 200px;
    padding-left: 10px;
    display: inline-block;
    vertical-align: top;

    h3 {
      font-weight: 900;
      color: #888888;
    }
    h5 {
      font-size: 13px;
      font-weight: bold;
      margin: 20px 0 0;
    }
    p {
      font-size: 12px;
      font-weight: 300;
    }
  }

  div.body {
    width: calc(100% - 200px);
    display: inline-block;

    div.col {
      padding: 0 10px;
      width: 50%;
      display: inline-block;
      vertical-align: top;

      @media (max-width: 768px) {
        width: 100%;
        display: block;
      }
    }

    .radio-group {
      margin-top: 30px;
      .email-radio {
        padding: 0 10px;
        width: 150px;
        display: inline-block;
      }
      @media (max-width: 768px) {
        margin-top: 0px;
      }
    }
    .email-radio {
      width: 150px;
      display: inline-block;
    }

    @media (max-width: 768px) {
      width: 100%;
      display: block;
    }
  }

  div.foot {
    padding: 0 10px;
    width: 100%;
    min-height: 40px;
    button {
      float: right;
      height: 29px;
      min-width: 60px;
      line-height: 29px;
    }
  }
`;

export default Content;
