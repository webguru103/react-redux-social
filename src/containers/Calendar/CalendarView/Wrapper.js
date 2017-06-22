import styled from 'styled-components';

const Wrapper = styled.div`
  color: #6f6f6f;
  flex-grow: 1;
  font-family: Lato;
  font-size: 11px;
  height: calc(100vh - 60px);

  .rbc-header {
    background-color: #efefef;
    height: 34px;
    line-height: 34px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
  }

  .rbc-month-view {
    border-left: 1px solid #dadfea;
    border-top: 1px solid #d6dbe1;
  }

  .rbc-month-row {
    background: #fff;
    overflow: visible;
  }

  .rbc-row-bg {
    overflow: visible;
  }

  .rbc-date-cell {
    color: #424647;
    padding-right: 13px;
    padding-top: 11px;
    padding-bottom: 5px;
    &.rbc-off-range {
      color: #acb5b8;
    }
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left: 1px solid #dadfea;
  }

  .rbc-today {
    background-color: #fff;
    border-top: 1px solid #e35a88;
    margin-top: -1px;
  }

  .rbc-now {
    color: #e35a88;
    &::before {
      content: 'Today';
      font-weight: normal;
      font-size: 9px;
      float: left;
      margin-left: 10px;
      margin-top: 2px;
    }
  }

  .rbc-event {
    border-radius: 3px;
    padding: 6px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2px;
    font-weight: bold;
  }
  .rbc-event-content {
    pointer-events: none;
  }

  .rbc-addons-dnd {
    .rbc-row-content {
      pointer-events: none;

      & .rbc-show-more {
        pointer-events: auto;
      }
      & .rbc-event:not(.rbc-addons-dnd-dragging) {
        pointer-events: all;
      }
    }

    .rbc-addons-dnd-over {
      background-color: #EFEFEF;
    }

    .rbc-event {
      transition: opacity 250ms;
      pointer-events: all;
    }

    .rbc-addons-dnd-is-dragging {
      & .rbc-event {
        pointer-events: none;
        opacity: .35;
      }
    }

    .rbc-addons-dnd-dragging {
      pointer-events: none;
      opacity: .35;
    }
  }
`;

export default Wrapper;
