import styled from 'styled-components';

const Wrapper = styled.tr`
  font-family: Lato;
  justify-content: space-between;
  padding: 0 10px;
  td.image {
    width: 60px;
    .image-wrapper {
      width: 32px;
      height: 32px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .thumbnail {
        border: none;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
  }
  td.detail { 
    padding-right: 10px;
    max-width: 250px;
    .title {
      color: #616669;
      font-size: 12px;
      font-weight: bold;
      text-decoration: underline;
    }
    .description {
      color: #616669;
      font-size: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  td.date {
    width: 150px;
    color: #616669;
    font-size: 12px;
  }

  td.channel {
    width: 80px;
  }
`;

export default Wrapper;
