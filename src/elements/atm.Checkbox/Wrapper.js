import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;

  .pp-checkbox {
    > div {
      width: 14px;
      height: 14px;
      background-color: ${({ bgColor }) => bgColor};
      border-color: ${({ bgColor }) => bgColor};

      &::after {
        transform: scale(0.8) rotate(45deg) !important;
        margin-left: -0.2rem;
        margin-top: -0.1rem;
      }
    }
    > span {
      color: ${({ textColor }) => textColor};
      font-size: 13px;
      font-weight: normal;
      line-height: 14px;
      padding-left: 16px;
    }
  }
`;

Wrapper.propTypes = {
  marginBottom: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Wrapper;
