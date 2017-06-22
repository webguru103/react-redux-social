import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  flex: 7;
  align-items: center;
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 17px;
    margin: 0;
    &.description {
      margin-top: 8px;
      color: #8C9496;
    }
  }
`;
