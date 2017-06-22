import styled from 'styled-components';

function getBackgroundColor({ type }) {
  switch (type) {
    case '2':
      return '#67C5E6;';
    case '5':
      return '#B171B5';
    default:
      return '';
  }
}

const StatusWrapper = styled.span`
  color: white;
  padding: 5px 10px;
  background-color: ${(props) => getBackgroundColor(props)};
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
`;

export default StatusWrapper;
