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
  
  .connectionBlock {
      padding: 5px 5px 5px 10px;
      display: inline-block;
      margin: auto;
      border: 1px solid #6f6f6f;
  }
  
  .connectionIcon {
    float:left;
    margin-right: 20px;
    i {
      font-size: 40px;
    }
  }
  
  .connectionName {
    padding-right: 10px;
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
