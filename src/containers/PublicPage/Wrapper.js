import styled from 'styled-components';

const Wrapper = styled.div`
  background: #E7ECEE;
  minHeight: 100vh;
  .header {
    height: 48px;
    background: #E81C64;
    display: flex;
    alignItems: center;
    img {
      height: 28px;
      marginLeft: 14px;
    }
  }
  .content {
    display: flex;
    padding: 36px 43px;
    align-items: flex-start;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
  }
`;

export default Wrapper;
