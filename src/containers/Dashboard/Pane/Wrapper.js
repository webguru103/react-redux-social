import styled from 'styled-components';

export default styled.div`
  border-radius: 4px;
  margin-bottom: 30px;
  box-shadow: 0px 1px 4px #bbb;
  background-color: #fff;

  h3.paneTitle {
    font-size: 16px;
    font-weight: 900;
    color: #616669;
    padding: 25px 22px;
    margin: 0;
    border-bottom: 1px solid #CFD8DC;
    i {
      font-family: FontAwesome;
      margin-right: 15px;
    }
  }
  div.paneContent {
    color: #8C9497;
    padding: 20px;

    p {
      color: #6F6F6F;
      font-size: 13px;
    }
  }

  div.profileButton {
    margin: 0 0 10px;
    p {
      display: inline-block;
      margin-right: 10px;
      line-height: 30px;
    }
    .setting {
      font-size: 11px;
      text-decoration: none;
      height: 32px;
      width: 128px;
      line-height: 32px;
      float: right;
    }
  }

  div.profile {
    margin: 10px 0 20px;
    .avatar {
      margin-right: 30px;
      display: inline-block;
    }

    .userInfo {
      display: inline-block;
      height: 90px;
      vertical-align: top;
      padding: 10px 0;
      h6 {
        color: #888888;
        display: inline-block;
        width: 60px;
        font-weight: bold;
      }
      p {
        color: #888888;
        display: inline-block;
      }
    }
  }
`;

