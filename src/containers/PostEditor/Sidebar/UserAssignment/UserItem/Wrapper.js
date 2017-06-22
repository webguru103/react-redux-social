import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  padding: 4px 9px 4px 4px;
  cursor: pointer;

  span {
    flex: 1;
    margin: 0 10px;
  }

  .hidden {
    visibility: hidden;
  }

  &.selected {
    background-color: rgba(231,236,238,0.6);
  }
`;
