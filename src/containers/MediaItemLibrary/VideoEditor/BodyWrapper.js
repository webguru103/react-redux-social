import styled from 'styled-components';

const BodyWrapper = styled.div`
  display: flex;
  font-family: Lato;
  .info-wrapper {
    flex: 3;
    padding-right: 20px;
  }
  .image-wrapper {
    flex: 2;
    padding-left: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      p {
        height: 15px;
        color: #8C9496;
        font-weight: bold;
        line-height: 15px;
        font-size: 12px;
        padding: 0;
        margin: 0;
      }
    }
    .cover-image {
      border-radius: 3px;
      height: 120px;
      margin-bottom: 20px;
      display: flex;
    }
  }
`;

export default BodyWrapper;
