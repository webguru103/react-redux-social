import styled from 'styled-components';

export default styled.div`
  display: inline-block;
  padding: 0.4rem 2rem;
  color: ${props => props.color};
  border: solid 1px ${props => props.color};
  cursor: pointer;
`;
