import styled from 'styled-components';

export default styled.div`
  display: block;

  .auto-complete {
    padding: 0;
    margin-top: -7px;
    ul:first-child {
      display: none;
    }
    ul:last-child {
      border-radius: 4px;
      box-shadow: 0 1px 5px 0 rgba(60,92,129,0.2);
      list-style-type: none;
      padding: 12px 17px;
      li {
        color: #8C9496;
        font-size: 12px;
        line-height: 25px;
        background-color: #ffffff !important;
        padding: 0;
        &:hover {
          color: #424647;
        }
      }
    }
    & > div {
      padding: 6px 0 2rem;
      span, &:after {
        display: none;
      }
      input {
        padding: 9px;
        font-size: 12px;
        color: #616669;
        border: 1px solid #C8CED0;
        border-radius: 4px;
      }
    }
  }
`;
