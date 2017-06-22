import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 20px;

  .content-wrapper {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #E7ECEE;
    padding: 20px 0;
    .item {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #E7ECEE;
      margin: 5px;
      img {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
  }

  .bottom-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

export default Wrapper;
