import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 11px;
  margin-bottom: 22px;
  .comment-content {
    flex: 1;
    margin-left: 11px;
    white-space: pre-wrap;
    word-break: break-all;
    .heading {
      display: flex;
      line-height: 18px;
      .name {
        font-size: 13px;
        font-weight: 900;
        color: #424647;
      }
      .time {
        font-size: 11px;
        color: #888888;
        margin-left: 10px;
      }
    }
    .comment {
      margin-top: 3px;
      font-size: 13px;
      color: #616669;
      .person-link {
        cursor: pointer;
        color: rgba(229,36,102,1);
      }
    }
  }
  .avatar {
    margin-top: 3px;
  }
  .ellipsis {
    float: right;
    display: inline-block;
    font-size: 16px;
    color: #888888;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #666666;
    }
  }
`;

export default Wrapper;
