import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  max-width: 587px;
  padding: 9px 12px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  background: #fff;

  border-radius: ${(props) => (props.borderTop ? '5px 5px 0 0' : '0px')};
  border-top: ${(props) => (props.borderTop ? '1px solid #e6ecf0' : 'inherit')};

  .tw-avatar {
    border-radius: 5px;
    margin-right: 10px;
  }
`;

export default Wrapper;
