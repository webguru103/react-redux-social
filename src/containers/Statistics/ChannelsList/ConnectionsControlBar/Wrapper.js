import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 0 20px 20px;
  color: #6e6f6f;
  margin-top: 20px;
  height: 80px;

  .noLeftPadding {
    padding-left: 0;
    input, span {
      font-size: 13px;
    }
    span {
      color: #888888;
      &.material-icons {
        color: #ACB5B8;
      }
    }
  }

  div {
    margin-left: 0rem !important;
  }
`;

export default Wrapper;
