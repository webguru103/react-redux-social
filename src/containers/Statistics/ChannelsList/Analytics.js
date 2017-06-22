import styled from 'styled-components';

const Analytics = styled.div`
  background-color: #f9f9fe;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  .tabLink{
      a {
          display: flex;
          padding: 0px;
          height: 56px;
          white-space: nowrap;
          margin: 0;
          align-items: center;
      }
      width: 220px;
      background-color: white;
  }
  .tabContent {
    padding: 0 30px;
    flex: 1;
  }
`;

export default Analytics;
