import styled from 'styled-components';

const Wrapper = styled.div`
  .feed-header {
    width: 100%;
    position: fixed;
    background: #fff;
    font-size: 16px;
    color: #5e5e5e;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
    padding: 10px 30px;
    border-top: 1px solid #e6e6e6;
    z-index: 1;

    i {
      margin-right: 5px;
    }
  }

  .feed-blocks {
    padding: 60px 50px 30px;

    @media (max-width: 768px) {
      padding: 40px 20px 10px;
    }
  }

  .feed-description {
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
    color: #999;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 30px;
  }

  img.feed-loading {
    display: block;
    width: 50px;
    margin: 20px auto;
  }

  a.feed-view-button {
    font-size: 20px;
    text-decoration: none;
    padding: 0 70px 50px;
    display: block;

    @media (max-width: 768px) {
      padding: 0 20px 20px;
    }
  }

  a.post-view-button {
    font-size: 12px;
    text-decoration: none;
    float: right;
  }
`;

export default Wrapper;
