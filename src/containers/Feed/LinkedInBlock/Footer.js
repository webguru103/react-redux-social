import styled from 'styled-components';

const Footer = styled.div`
  margin-top: 10px;

  .ln-comment-details {
    display: inline-block;

    .ln-comment-detail {
      display: inline-block;
      vertical-align: middle;
      color: rgba(0,0,0,.55);
      font-size: 13px;
      font-weight: 400;
    }

    .ln-comment-dot {
      margin-left: 4px;
      margin-right: 4px;
      &::before {
        content: "\\00b7";
      }
    }
  }
`;

export default Footer;
