import styled from 'styled-components';

const Wrapper = styled.div`
  width: 600px;
  background-color: #FFFFFF;
  padding: 30px 20px 20px 20px;
  font-family: Lato;

  .header-wrapper {
    display: flex;
    justify-content: space-between;

    h3 {
     color: #616669;
     font-size: 14px;
     font-weight: bold;
     line-height: 15px;
     text-transform: uppercase;
     padding: 0;
     margin: 0;
      i {
        font-family: FontAwesome;
        margin-right: 10px;
      }
    }

    button {
      background: transparent;
      border: none;
      font-size: 18px;
      line-height: 27px;
      color: #888888;
      margin-top: -5px;
      &:focus {
        outline: 0;
      }
    }
  }
`;

export default Wrapper;
