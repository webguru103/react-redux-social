import styled from 'styled-components';

import theme from 'theme';

export default styled.div`
  display: inline-block;
  position: relative;
  margin: 0 25px 15px 0;
  padding: 20px 20px 10px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
  border-radius: 4px;
  color: gray;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    transition: box-shadow 0.3s;
  }

  .avatar {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-right: 20px;
    vertical-align: top;
  }
  .detail-pane {
    display: inline-block;
    width: 220px;
    vertical-align: top;
    .name {
      font-size: 1.3rem;
      font-weight: 700;
    }
    .email {
      margin-top: 4px;
      font-size: 1.1rem;
      font-size: 300;
    }
  }
  .dropdown-wrapper {
    margin-top: 11px;
    width: 140px;
    height: 40px;
  }
  .menu-wrapper {
    position: absolute;
    top: 7px;
    right: 10px;
  }
  .remove-member {
    color: ${theme.primaryColor};
  }
`;
