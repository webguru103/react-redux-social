import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 25px;
  font-size: 24px;
  background-color: #f9fafa;
  border-left: 1px solid #dadfea;

  div.calendar-toolbar-text {
    display: inline-block;
    min-width: 160px;

    span.calendar-toolbar-month {
      font-weight: 900;
    }
    span.calendar-toolbar-year {
      font-weight: 200;
    }
  }

  i {
    color: #888;
    font-weight: 100;
    cursor: pointer;

    &.calendar-toolbar-prev {
      margin-left: 10px;
    }
    &.calendar-toolbar-next {
      margin-left: 30px;
    }
  }
`;

export default Wrapper;
