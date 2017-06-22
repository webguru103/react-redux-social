import styled from 'styled-components';

const Wrapper = styled.div`
  width: 224px;
  height: 100%;
  background: #fff;
  padding: 25px 20px;
  overflow-y: auto;

  .cal-sidebar-title {
    color: #616669;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 20px;
  }

  .cal-sidebar-search {
    font-size: 12px;
    font-family: Lato;
    position: relative;
    margin-bottom: 24px;
    input {
      padding: 6px 24px 6px 9px;
      border: 1px solid #C8CED0;
      border-radius: 4px;
      width: 100%;
    }
    i {
      color: #8C9496;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .cal-sidebar-statuses {
    margin-bottom: 33px;
  }

  .cal-sidebar-unscheduled {
    .cal-sidebar-unscheduled-item {
      padding: 0 20px;
      margin: 0 -20px;
      color: #616669;
      font-size: 12px;
      font-weight: bold;
      line-height: 28px;
      height: 28px;
      position: relative;
      cursor: pointer;
      .fa-ellipsis-h {
        visibility: hidden;
        font-size: 15px;
        float: right;
        padding: 4px;
        cursor: pointer;
      }
      &:hover, &.active {
        background-color: #F9FAFA;
        i {
          visibility: visible;
        }
      }
    }
  }
`;

export default Wrapper;
