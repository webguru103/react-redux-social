import styled from 'styled-components';

const Footer = styled.div`

  font-size: 16px;
  line-height: 1;
  color: #aab8c2;
  margin-top: 10px;
  margin-bottom: 2px;

  .tw-footer-detail {
    display: inline-block;
    min-width: 80px;

    span, i {
      display: inline-block;
      vertical-align: middle;
    }

    .tw-footer-value {
      margin-left: 6px;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

export default Footer;
