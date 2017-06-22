import styled from 'styled-components';
import PropType from 'prop-types';

function setBorder(props) {
  if (props.noBorder) {
    return 'none';
  }

  return `solid 1px ${props.color}`;
}

function setPadding({ noBorder }) {
  if (noBorder) {
    return '3px 10px';
  }

  return '0.4rem 2rem';
}

const SimpleButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => setPadding(props)};
  color: ${(props) => props.color};
  border: ${(props) => setBorder(props)};
  cursor: pointer;
`;

SimpleButton.propType = {
  noBorder: PropType.bool,
};

SimpleButton.defaultProps = {
  noBorder: false,
};

export default SimpleButton;


