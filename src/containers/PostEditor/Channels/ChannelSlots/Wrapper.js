import styled from 'styled-components';

const Wrapper = styled.div`
  width: 280px;
  .channel-slot {
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #DBDFE0;
  }

  .slot-header {
    i {
      font-size: 32px;
      border-radius: 2px;
      vertical-align: middle;
      margin-right: 18px;
    }
    .facebook-icon-color {
      color: #4867AA;
    }
    .linkedin-icon-color {
      color: #0177B5;
    }
    .pinterest-icon-color {
      color: #D50C22;
    }
    .twitter-icon-color {
      color: #1DA1F2;
    }
    .wordpress-icon-color {
      color: #464646;
    }
    .google-icon-color {
      color: #d34836;
    }

    span {
      color: #888888;
      font-family: Lato;
      font-size: 15px;
      line-height: 17px;
      vertical-align: middle;
    }
  }

  .slot-timestamp {
    position: relative;
    text-align: right;
    button {
      width: 238px;
      height: 32px;
      text-align: left;
      color: #8C9496 !important;
      font-family: Lato;
      font-size: 12px;
      font-weight: bold;
      line-height: 15px;
      border: none;
      
      &.active {
        background-color: #F0F3F4;
        border-radius: 4px;
      }
    }
    i {
      visibility: hidden;
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 16px;
      color: #333;
      text-align: right;
      cursor: pointer;
    }
    &:hover i {
      visibility: visible;
    }
  }
`;

export default Wrapper;
