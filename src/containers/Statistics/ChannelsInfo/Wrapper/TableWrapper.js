import styled from 'styled-components';

export default styled.div`
  text-align: center;
  height: 80px;
  border: 0px;
  flex: 5;
  display: flex;
  flex-direction: row;

  .borderRight {
    border-right: 1px solid #dbdfef;
  }

  div {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6F6F6F;
    .value {
      font-size: 24px;
      line-height: 26px;
      font-weight: 900;
    }
    .description {
      line-height: 17px;
      font-size: 11px;
      font-weight: bold;
      color: #888888;
    }
  }

  table {
    width: 100%;
  }

  .description {
    font-size: 11px;
    font-weight: normal;
  }
`;
