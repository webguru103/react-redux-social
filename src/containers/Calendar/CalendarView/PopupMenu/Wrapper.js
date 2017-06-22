import styled from 'styled-components';

const wrapperWidth = 362;
const wrapperHeight = 275;
const arrowHeight = 20;

function getX({ position }) {
  if (position.x + (wrapperWidth / 2) > window.innerWidth) {
    return window.innerWidth - (wrapperWidth / 2) - 4;
  }
  return position.x;
}

function getY({ position }) {
  if (position.y - wrapperHeight < 0) {
    return wrapperHeight;
  }
  return position.y;
}

const Wrapper = styled.div`
  width: ${wrapperWidth}px;
  padding: 14px 14px 20px 20px;
  position: fixed;
  background: #fff;
  -webkit-filter: drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  filter        : drop-shadow(0 1px 5px rgba(60, 92, 129, 0.42));
  -ms-filter    : "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=1, Color='#383C5C81')";
  left: ${(props) => `${getX(props)}px`};
  top: ${(props) => `${getY(props)}px`};
  transform: translate(-50%, calc(-100% - ${arrowHeight}px));
  z-index: 10000;
  &::before {
    content: "";
    position: absolute;
    top: -webkit-calc(100% - ${arrowHeight / 2}px); /*may require prefix for old browser support*/
    top: calc(100% - ${arrowHeight / 2}px); /*i.e. half the height*/
    left: calc(50% - ${arrowHeight / 2}px);
    height: ${arrowHeight}px;
    width: ${arrowHeight}px;
    background: #fff;
    transform: rotate(45deg);
  }

  .event-popup-close {
    position: absolute;
    top: 9px;
    right: 10px;
    i {
      font-size: 14px;
      padding: 4px;
      color: #888888;
      cursor: pointer;
    }
  }

  .event-popup-image {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 53px;
    right: 17px;
    border-radius: 5px;
  }

  .event-popup-status {
    color: #E81C64;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 15px;
  }

  .event-popup-title {
    color: #616669;
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    margin-bottom: 5px;
  }

  .event-popup-time {
    color: #616669;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 24px;
  }

  .event-popup-message {
    width: calc(100% - 120px);
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    color: #616669;
    font-size: 11px;
    line-height: 15px;
  }

  .event-popup-channel-count {
    color: #333;
    font-size: 11px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 32px;
  }

  .event-popup-tag {
    display: inline-block;
    border-radius: 4px;
    background-color: #7ED321;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    padding: 4px 10px;
    margin-right: 6px;
    margin-bottom: 2px;
    i {
      font-size: 10px;
      margin-right: 4px;
    }
  }

  .event-popup-buttons {
    float: right;
    display: inline-block;
    margin-top: 4px;
    .event-popup-primary {
      width: 70px;
      height: 30px;
      padding: 0;
      line-height: 1;
      font-size: 12px;
    }
    .event-popup-flat {
      height: 30px;
      color: #8C9496 !important;
      font-size: 12px;
      line-height: 1;
      border: none;
      margin-right: 10px;
    }
  }
`;

export default Wrapper;
