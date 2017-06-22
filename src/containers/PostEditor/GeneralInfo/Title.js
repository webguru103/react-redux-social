import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  color: #6F6F6F;
  font-family: Lato;
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 4px -9px;
  padding: 2px 7px;
  border: 1px solid transparent;
  border-radius: 2px!important;
  &:hover {
    border-color: #e5e5e5;
  }
  &:focus {
    border: 1px solid #4d90fe!important;
    box-shadow: inset 0px 1px 2px rgba(0,0,0,0.1);
    outline: none;
  }
`;

export default Wrapper;
