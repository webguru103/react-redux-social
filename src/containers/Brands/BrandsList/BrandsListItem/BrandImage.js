import styled from 'styled-components';

const BrandImage = styled.div`
  background: ${(props) => props.color};
  width: 90px;
  height: 90px;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  p {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    text-align: center;
    color: #FFFFFF;
    font-size: 40px;
    margin: 0;
    padding: 0;
    line-height: 90px;
  }
`;

export default BrandImage;
