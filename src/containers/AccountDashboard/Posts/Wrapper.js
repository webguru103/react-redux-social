import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    width: 100%;
    margin-top: 20px;
    border-bottom: 0.85px solid #DBDFE0;
    tr {
      display: flex;
      color: #888888;
      font-size: 11px;
      font-weight: bold;
      justify-content: space-between;
      th.posts {
        flex: 1;
      }
      th.date {

      }
      th.status {
        flex: 1;
        text-align: right;
      }
    }
    tr.header {
      height: 30px;
      line-height: 30px;
      border-bottom: 0.85px solid #DBDFE0;
    }
  }
  
  .bottom-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

export default Wrapper;
