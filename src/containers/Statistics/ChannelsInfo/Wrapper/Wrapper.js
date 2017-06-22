import styled from 'styled-components';

export default styled.div`
    display: inline-block;
    width: 100%;

    .borderRight {
        border-right: 1px solid #dbdfef;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        float: left;
    }

    .lsitItem {
        th {
            width: 33%;
            text-align: center;
        }
    }
    table {
        width: 100%;
    }
    tspan {
      font-size: 11px;
    }
    .recharts-x-axis {
      text {
        transform: translateY(10px);
      }
    }
    .recharts-y-axis {
      text {
        transform: translateX(-10px);
      }
    }
`;
