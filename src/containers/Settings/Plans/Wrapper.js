import styled from 'styled-components';

import theme from 'theme';

const { textColor } = theme;

export default styled.div`
  color: ${textColor};

  .left-pane {
    max-width: 100%;
    width: 400px;
    display: inline-block;
    vertical-align: top;
    margin-right: 30px;
  }
  .right-pane {
    max-width: 100%;
    width: 650px;
    display: inline-block;
    vertical-align: top;

    .title {
      font-size: 1.8rem;
      margin: 13px 0 20px;
    }
    table {
      table-layout: fixed;
      width: 100%;
      tr {
        border-bottom: 1px solid ${textColor};
      }
      th, td {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
      }
      th {
        padding: 8px 3px;
        &.date {
          width: 25%;
        }
        &.paid {
          width: 50%;
        }
        &.status {
          width: 25%;
        }
      }
      td {
        padding: 20px 3px;
      }
    }
  }
`;
