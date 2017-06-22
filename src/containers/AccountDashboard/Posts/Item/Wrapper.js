import styled from 'styled-components';

const Wrapper = styled.tr`
  display: flex;
  margin: 15px 0;
  align-items: center;

  th.posts {
    flex: 1;
    font-size: 12px;
    font-weight: bold;
    text-decoration: underline;
  }

  th.date {
    font-weight: 400;
  }

  th.status {
    flex: 1;
    text-align: right;
  }
`;

export default Wrapper;
