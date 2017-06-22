import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 280px;

  p {
    color: #6f6f6f;
    font-family: Lato;
    font-size: 1.675rem;
    line-height: 1.69rem;
  }

  .connectionBlockLoading {
      padding: 18px 24px;
      display: inline-block;
      margin: auto;
      border-radius: 4px;

      box-shadow: 0 1px 4px 0 rgba(60,92,129,0.22);
  }

  .connectionIcon {
    display: inline-block;
    margin-right: 20px;
    i {
      font-size: 59px;
      line-height: 50px;
    }
    vertical-align: middle;
  }

  .connectionContent {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    line-height: 18px;
  }

  .connectionName {
    color: #616669;
    font-size: 26px;
    line-height: 32px;
    padding-right: 10px;
  }

  .crunchingNumber {
    color: #6F6F6F;
    font-weight: normal;
    font-size: 22px;
    line-height: 27px;
    margin-top: 33px;
  }

  .connectionType {
    padding-left: 5px;
  }

  .controlBlock {
    float: right;
    text-align: center;
  }

  .facebook {
    color: #4867AA;
  }

  .linkedin {
    color: #0177B5;
  }

  .pinterest {
    color: #D50C22;
  }

  .twitter {
    color: #1DA1F2;
  }

  .wordpress {
    color: #464646;
  }

  .clearBoth {
    clear: both;
  }

  .disabledLabel, .disconnectedLabel, .enabledLabel {
    border-radius: 8px;
    height: 40px;
    width: 120px;
    padding-top: 10px;
  }

  .disabledLabel {
    background-color: #AAB3B7;
    color: #FFFFFF;
  }

  .disconnectedLabel {
    background-color: #FFFFFF;
    color: #EC0057;
    border: 1px solid #EC0057;
  }

  .enabledLabel {
    background-color: #EC0057;
    color: #FFFFFF;
  }
`;

export default Wrapper;
