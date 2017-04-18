import styled from 'styled-components';

const Header = styled.div`

  .ln-header-avatar {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 36px;
    line-height: 36px;

    i {
      color: #b3b6b9;
    }
  }

  .ln-header-channel-name {
    display: block;
    font-size: 14px;
    line-height: 12px;
    font-weight: 500;
    color: rgba(0,0,0,.85);
  }

  div {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
  }

  span {
    color: #90949c;
    font-size: 12px;
    line-height: 1.34;
  }
`;

export default Header;
