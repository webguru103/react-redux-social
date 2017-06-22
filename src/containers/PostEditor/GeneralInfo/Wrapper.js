import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${({ modal }) => modal ? '20px 40px' : '0 0 20px'};
  border-bottom: ${({ modal }) => modal ? '1px solid #DBDFE0' : 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .back-button {
    font-size: 30px;
    color: #6F6F6F;
    cursor: pointer;
  }
`;

export default Wrapper;
