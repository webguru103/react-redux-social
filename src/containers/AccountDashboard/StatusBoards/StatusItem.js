import styled from 'styled-components';

const StatusItem = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  .item-wrapper {
    .icon {
      font-size: 25px;
      display: inline-block;
      .fa-thumbs-o-up {
        color: #ABE66A;
      }
      .fa-check-squre {
        color: #B171B5;
      }
      .fa-pencil {
        color: #67C5E6;
      }
      .fa-lightbulb-o {
        color: #ACB5B8;
      }
    }
    .count {
      display: inline-block;
      font-family: Lato;
      color: #6F6F6F;
      font-size: 20px;
      font-weight: 900;
      margin-left: 24px;
    }
    .status {
      display: inline-block;
      font-family: Lato;
      color: #888888;
      font-size: 11px;
      font-weight: 500;
      margin-left: 8px;
    }
  }
`;

export default StatusItem;
