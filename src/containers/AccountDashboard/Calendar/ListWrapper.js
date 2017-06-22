import styled from 'styled-components';

const ListWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid #E7ECEE;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(60,92,129,0.08);
  margin-top: 20px;
  padding: 17px;

  table {
    width: 100%;
    font-family: Lato;
    tr {
      border-bottom: 1.2px solid #DBDFE0;
      height: 65px;
      th {
        color: #888888;
        font-size: 11px;
        font-weight: bold;
      }
      th.preview {
        padding-left: 6px;
      }
      th.date {
      }
      th.channel {
        text-align: center;
      }
    }
    tr.header {
      height: 50px;
      line-height: 50px;
    }
  }
`;

export default ListWrapper;
