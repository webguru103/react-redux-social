import styled from 'styled-components';

function borderStyle({ border }) {
  if (border) {
    return `
      border-bottom: 2px solid #DBDFE0;
    `;
  }
  return null;
}

function expandStyle({ expand }) {
  if (expand) {
    return `
      cursor: pointer;
      &:hover {
        .title {
          text-decoration: underline;
        }
      }
    `;
  }
  return null;
}


const Wrapper = styled.div`
  display: flex;
  color: #888888;
  padding-bottom: 14px;
  line-height: 25px;
  ${borderStyle}
  ${expandStyle}
  .title {
    font-size: 16px;
  }
  .icon {
    font-size: 20px;
    line-height: 25px;
    margin-right: 13px;
  }
  .expand-icon {
    margin-left: auto;
  }
`;

export default Wrapper;
