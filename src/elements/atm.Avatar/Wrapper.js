import styled from 'styled-components';

const Avatar = styled.div`
  background: transparent;

  h6 {
    margin: 10px 0 6px;
    font-weight: bold;
  }
  .avatar-photo {
    display: table;
    position: relative;
    padding: 0;
    outline: none;
    border: none;
    border-radius: 4px;
    width: 180px;
    height: 180px;

    img {
      width: 100%;
      height: auto;
      left: 0px;
      border-radius: 4px;

      &[alt] {
        color: transparent;
      }
    }

    .avatar-initial {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 4px;
      border: none;
      text-align: center;
    }

    .avatar-txt {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 4px;
      border: 1px solid #C8CED0;
      opacity: 0;
      background-color: rgba(0,0,0, .5);
      transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
      text-align: center;

      i, p {
        padding: 10px;
        color: white;
        display: inline-block;
        font-weight: 900;
      }

      i {
        margin-top: calc(50% - 15px);
        vertical-align: super;
        font-size: 20px;
        font-family: FontAwesome;
      }

      &:hover {
        opacity: 1;
        border: 1px solid #e81c64;
        cursor: pointer;
      }
    }
  }
`;

export default Avatar;
