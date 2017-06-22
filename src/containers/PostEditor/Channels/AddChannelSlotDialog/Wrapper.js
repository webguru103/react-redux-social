import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 25px 40px 24px 40px;
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  height: 80vh;
  position: relative;
  .main-content {
    flex: 1;
    overflow: auto;
    margin-top: 20px;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      color: #6F6F6F;
      font-size: 20px;
      line-height: 24px;
    }
    .close-button {
      color: #888888;
      font-size: 24px;
      line-height: 27px;
      cursor: pointer;
    }
  }

  .instruction {
    color: #8C9496;
    font-size: 12px;
    line-height: 15px;
    margin-top: 11px;

    &.highlighted {
      color: #333;
      font-weight: bold;
    }
  }

  .post-style {
    color: #616669;
    font-size: 12px;
    line-height: 15px;
    text-decoration: underline;
    margin-top: 11px;
    cursor: pointer;
  }

  .schedules-block {
    margin-top: 5px;
  }

  .channels-block {
    margin-top: 25px;
  }

  .schedule-selected-channels {
    margin-top: 20px;
  }
`;

export default Wrapper;
