import styled from 'styled-components';

const MainWrapper = styled.div`
    background-color: #fdfefe;
  
    .basicInfo {
        height: 80px;
        background-color: white;
        border: 1px solid #dddddd;
        display: block;
        position: relative;
        margin-top: 30px;
        margin-left: 10px;
        border-right: 0px;
    }
    .channelsinfo{
        margin-top: 50px;
    }
    .infoTab {
        border-bottom: 1px solid #777777;
    }
    .paddingleft {
        padding-left: 10px;
        color: #888888;
    }
    .tablewidth {
        width: 100%;
        height: 100%;
    }
    .borderright { 
        border-right: 1px solid #dddddd;
    }
    th {
        text-align: center;
        color: #777777;
    }
    
    .activeWidth {
        width: 28%;
        border-right: 1px solid #dddddd;
    }
    
    .infoWidth {
        width: 18%;
        border-right: 1px solid #dddddd;
    }
  
    .connectionBlock {
        padding: 5px 5px 5px 10px;
        display: inline-block;
        margin: auto;
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

export default MainWrapper;
