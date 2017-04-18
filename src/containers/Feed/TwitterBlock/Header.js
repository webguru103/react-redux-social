import styled from 'styled-components';

const Header = styled.div`
  font-size: 13px;
  color: #657786;

  .tw-header-name {
    margin-right: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #14171a;

    &:hover {
      color: #0084B4;
    }
  }
  .tw-header-dot {
    margin-left: 4px;
    margin-right: 4px;
    &::before {
      content: "\\00b7";
    }
  }
  .tw-header-date {
    font-size: 12px;
  }
`;

export default Header;
