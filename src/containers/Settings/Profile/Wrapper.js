import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  * {
    font-family: 'Lato', sans-serif;
    color: #888888;
  }

  div.avatar-image {
    display: inline-block;
    padding: 0 40px 0 10px;
  }

  div.basic-info {
    width: calc(100% - 240px);
    max-width: 430px;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 45px;

    @media (max-width: 768px) {
      padding: 0 10px;
      margin-bottom: 5px;
      width: 100%;
      display: block;
    }

    button {
      float: right;
      height: 29px;
      min-width: 60px;
      line-height: 29px;
    }
  }

  div.col {
    padding: 0 10px;
    width: 50%;
    display: inline-block;
    vertical-align: top;

    @media (max-width: 768px) {
      width: 100%;
      display: block;
    }

    button {
      float: right;
      height: 29px;
      min-width: 60px;
      line-height: 29px;
    }
  }
`;

export default Wrapper;
