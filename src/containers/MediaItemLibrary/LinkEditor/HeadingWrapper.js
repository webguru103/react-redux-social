import styled from 'styled-components';

const HeadingWrapper = styled.div`
  font-family: Lato;

  .header-info {
    display: flex;
    justify-content: space-between;
    h3 {
      height: 24px;
      color: #6F6F6F;
      font-size: 20px;
      line-height: 24px;
      margin: 0;
      padding: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-right: 30px;

      span {
        padding-left: 20px;
        height: 14px;
        color: #8C9496;
        font-size: 14px;
        line-height: 14px;
        text-align: right;

        i {
          font-family: FontAwesome;
          margin-right: 10px;
        }
      }
    }

    button {
      background: transparent;
      border: none;
      font-size: 24px;
      line-height: 27px;
      color: #888888;
      margin-top: -5px;
      &:focus {
        outline: 0;
      }
    }
  }

  p {
    height: 15px;
    color: #8C9496;
    font-size: 12px;
    line-height: 15px;
    margin-top: 10px;
    padding: 0;
  }
`;

export default HeadingWrapper;
