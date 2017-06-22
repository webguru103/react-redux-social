import styled from 'styled-components';

const Wrapper = styled.div`
  position: ${({ modal }) => modal ? 'fixed' : 'absolute'};
  left: 0; top: 0; bottom: 0; right: 0;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 10000;
  .active-link {
    a {
      color: #424647 !important;
      border-top: 2px solid #E81C64;
      border-left: 1px solid #DBDFE0;
      border-right: 1px solid #DBDFE0;
      border-bottom: 1px solid transparent !important;
      span {
        display: none;
      }
    }
  }
  a {
    transition: border-bottom 0.3s, color 0.3s;
    cursor: pointer;
  }
  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    .content {
      display: flex;
      min-height: 100%;
    }
  }
  .main {
    padding: 40px;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export default Wrapper;
