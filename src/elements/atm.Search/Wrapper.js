import styled from 'styled-components';

const Search = styled.div`
  position: relative;
  input {
    padding: 0.6rem 2rem 0.6rem 1rem;
    width: 100%;
    border: 1px solid #C8CED0;
    border-radius: ${(props) => props.borderRadius}px;
    font-size: 1.2rem;
    outline: none;
  }
  i {
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
  }
`;

export default Search;
