import styled from 'styled-components';

const Content = styled.div`
  margin: 15px 0;
  color: #1d2129;

  .fb-message {
    font-size: 14px;
    font-weight: normal;

    &.large {
      font-size: 24px;
      font-weight: 300;
    }
  }

  .fb-link {
    border: 1px solid;
    border-color: #e9ebee #e9ebee #d1d1d1;
    margin-top: 10px;

    img {
      display: block;
      max-width: 100%;
    }

    .fb-link-content {
      margin: 10px 12px;
      font-size: 12px;

      .fb-link-title {
        font-family: Georgia, serif;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
        overflow: hidden;
        word-wrap: break-word;
        margin-bottom: 5px;
      }

      .fb-link-description {
        line-height: 16px;
        max-height: 80px;
        overflow: hidden;
      }

      .fb-link-caption {
        font-size: 11px;
        padding-top: 9px;
        color: #90949c;
        text-transform: uppercase;
      }
    }
  }

  .fb-image {
    max-width: 100%;
    margin-top: 10px;
  }

  video {
    width: 100%;
    height: auto;
    max-height: 100%;
    margin-top: 10px;
  }
`;

export default Content;
