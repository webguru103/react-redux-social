import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 50px;
  border-radius: 4px;
  background-color: #FFFFFF;
  padding: 24px;
  font-family: Lato;
  flex: 2;

  .time {
    color: #8C9496;
    font-size: 11px;
    line-height: 13px;
  }

  .description {
    color: #616669;
    font-family: Lato;
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    margin-top: 10px;
  }

  .mediaContent {
    margin-top: 24px;
  }
`;

export default Wrapper;
