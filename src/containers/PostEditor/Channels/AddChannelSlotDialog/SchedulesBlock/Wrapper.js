import styled from 'styled-components';

const Wrapper = styled.div`
  .controls-wrapper {
    font-size: 13px;
    display: flex;
    align-items: center;
    .first {
      flex: 2;
      margin-right: 8px;
    }
    .second {
      flex: 1;
      margin-right: 8px;
    }
    .action {
      width: 10px;
      margin-right: 8px;
      font-size: 14px;
      text-align: right;
    }

    &.heading {
      font-size: 12px;
    }

    &.date-time-picker {
      margin-top: 8px;
      div[data-react-toolbox=input] {
        padding: 0;
        input {
          border: 1px solid #CFD8DC;
          border-radius: 4px;
          font-size: 13px;
          line-height: 14px;
          padding: 9px 12px;
        }
      }
      .close-button {
        cursor: pointer;
      }
    }
  }

  .add-another {
    margin-top: 8px;
    padding: 11px 16px;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Wrapper;
