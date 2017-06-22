import styled from 'styled-components';

const Wrapper = styled.div`

    .basicInfo {
        height: 80px;
        display: block;
        position: relative;
        margin-top: 30px;
        margin-left: 10px;
        border-right: 0px;

        .tablewidth {
          box-shadow: 0px 1px 6px #cccccc;
          border-radius: 3px;
          overflow: hidden;
        }
    }
    .channelsinfo{
        margin-top: 50px;
        color: rgb(136, 136, 136);
        h3 {
          padding-left: 22px;
          font-weight: 200;
          font-size: 22px;
          color: #616669;
        }
    }
    .infoTab {
        border-bottom: 1px solid #777777;
    }
    .infoTabItem {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 13px;
        padding-bottom: 21px;
        display: inline-block;
        font-weight: 700;
        padding-top: 20px;
        font-family: 'Lato';
        font-size: 13px;
        color: #888888;
        letter-spacing: 0;
        line-height: 17px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;

        &:hover, &:active, &.darken {
            color: #4A4A4A;
            text-decoration: none;
        }

        &.activeBorderline {
            border-bottom: 2px solid #E52466;
            color: #4A4A4A !important;
        }
    }
    .topItemValue {
      margin-bottom: 2px;
    }
    .topItemLabel {
      margin-top: 0;
      margin-bottom: 25px;
      font-size: 11px;
    }
    .paddingleft {
        padding-left: 10px;
        color: #888888;
    }
    .tablewidth {
        width: 100%;
        display: inline-block;
        height: 84px;
    }
    .tablewidth.short {
        max-width: 400px;
    }
    .borderright {
        border-right: 1px solid #dddddd;
    }

    .tbody {
      display: flex;
      align-items: center;
      .activeWidth {
          flex: 3;
          height: 87px;
          display: flex;
          background-color: white;
      }

      .infoWidth {
          flex: 2;
          background-color: #f9fafa;
      }

      .activeWidth, .infoWidth {
        text-align: center;
        color: #777777;
        border-right: 1px solid #dddddd;
      }
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
            font-size: 50px;
        }
    }

    .connectionName {
        padding-right: 10px;
        font-size: 25px;
        font-weight: regular;
    }

    .basicInfo {
      .connectionBlock {
        display: flex;
      }
      .connectionName {
        white-space: nowrap;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
