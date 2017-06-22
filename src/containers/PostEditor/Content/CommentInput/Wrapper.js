import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  .input {
    flex: 1;
    margin-left: 8px;
    margin-top: 2px;
    [data-react-toolbox=input] {
      padding: 0;
    }
    textarea {
      display: block;
      margin-top: -2px;
      padding: 11px 13px;
      border: 1px solid #C8CED0;
      border-radius: 4.4px;
      font-size: 13px;
      line-height: 16px;
      resize: none;
    }
    span {
      display: none;
    }
  }
  .avatar {
    position: relative;
    z-index: 100;
  }
  .send-button {
    margin-left: 8px;
    button{
      height: 40px;
      &[disabled] {
        background-color: #ACB5B8;
      }
    }
  }
`;

export default Wrapper;
