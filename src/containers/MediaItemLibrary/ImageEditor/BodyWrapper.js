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
    margin-top: 30px;
    padding-left: 20px;
    .cover-image {
      border-radius: 3px;
      height: 180px;
      margin-bottom: 20px;
      display: flex;
    }
  }
`;

export default BodyWrapper;
