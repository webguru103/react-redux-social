import styled from 'styled-components';

export default styled.div`
  display: flex;
  & > div:first-child {
    flex: 2;
    margin-right: 5px;
  }
  & > div:last-child {
    flex: 1;
  }
`;
