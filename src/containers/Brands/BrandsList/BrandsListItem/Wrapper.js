import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 15px 15px 15px;
  padding: 13px;
  display: inline-flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  height: 116px;
  width: 343px;
  box-shadow: 0 1px 6px 0 rgba(60,92,129,0.22);
  font-family: Lato;

  span {
    color: #888888;
  }

  &:hover {
    box-shadow: 2px 2px 9px 6px rgba(0,0,0,0.1);
    a {
      text-decoration: none;
    }
  }  
`;

export default Wrapper;
