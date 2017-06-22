import styled from 'styled-components';

export const UploadButtonWrapper = styled.div`
  margin-top: 7px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  a {
    color: inherit;
    font-size: 12px;
    &.disabled {
      color: #bbbbbb;
      pointer-events: none;
      cursor: default;
    }
  }
`;

export default styled.div`
  width: 240px;
  height: 150px;
  background: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
