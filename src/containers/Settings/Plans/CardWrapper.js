import styled from 'styled-components';

import Card from 'elements/atm.Card';
import theme from 'theme';

const { textColor, textColorDark } = theme;

export default styled(Card)`
  padding: 15px 23px;
  position: relative;
  color: ${textColor};

  .title-label {
    font-size: 1.8rem;
  }
  .title {
    font-size: 2.8rem;
    font-weight: bold;
    color: ${textColorDark};
  }
  .divider {
    margin: 5px 0 15px;
    height: 1px;
    background-color: ${textColor};
  }
  section {
    margin-bottom: 25px;
    .header {
      color: ${textColorDark};
      font-size: 1.3rem;
      font-weight: 500;
    }
    .value {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }
  button {
    position: absolute;
    right: 20px;
    bottom: 35px;
  }
`;
