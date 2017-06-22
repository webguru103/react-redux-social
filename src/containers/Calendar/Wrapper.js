import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  font-family: Lato;
  .post-editor {
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 10000;
  }
  &.modal-open {
    overflow: hidden;
    .post-editor {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

export default Wrapper;
