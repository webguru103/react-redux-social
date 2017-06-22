import styled from 'styled-components';

export default styled.div`
  color: #616669;

  .first-row {
    margin-top: 42px;
    display: flex;
    align-items: center;

    .include-label {
      font-size: 14px;
      line-height: 17px;
      margin-right: 59px;
    }
  }

  .second-row {
    margin-top: 32px;
    font-size: 14px;
    line-height: 17px;
  }

  .third-row {
    margin-top: 8px;
    font-size: 12px;
    line-height: 15px;
  }

  .disabled {
    opacity: 0.39;
  }
  .enabled {
    cursor: pointer;
  }

  .stream-row {
    margin-top: 27px;
    padding-left: 8px;
    i {
      font-size: 25px;
      margin-right: 8px;
      border-radius: 2.14px;
      color: #C8CED0;
    }
  }

  .popup-wrapper {
    position: relative;
  }
  .message-wrapper {
    width: 408px;
    min-height: 95px;
  }
`;
