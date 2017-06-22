import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import Button from 'elements/atm.Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Lato;
  width: 70%;
  border-bottom: 1px solid #DBDFE0;
  margin-top: 30px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  padding-right: 50px;
  margin-bottom: 15px;
  cursor: pointer;

  a:hover {
    text-decoration: none;
  }
  a:focus{
    text-decoration: none;
  }
`;

const Title = styled.p`
  color: #424647;
  font-size: 14px;
  font-weight: bold;
  line-height: 17px;
  margin: 0;
  padding: 0;
`;

const Intro = styled.p`
  color: #616669;
  font-size: 12px;
  margin: 0;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const SourceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    height: 20px;
  }

  p {
    color: #8C9496;
    font-size: 11px;
    font-weight: bold;
  }
`;

function FeedItem({ item, feedName, onAddFeed, createPost }) {
  return (
    <Wrapper>
      <InfoWrapper>
        <a href={item.source} target="_blank">
          <Title>{item.title}</Title>
          <Intro>{renderHTML(item.intro)}</Intro>
          <SourceWrapper>
            {item.image ?
              <img role="presentation" src={item.image} />
              : <p>{feedName}</p>
            }
            <p>{item.date_friendly}</p>
          </SourceWrapper>
        </a>
      </InfoWrapper>
      <Button
        label="Add to Library"
        style={{ background: '#8C9496' }}
        neutral={false}
        onClick={onAddFeed}
      />
      <Button
        label="Create Post"
        style={{ background: 'red' }}
        neutral={false}
        onClick={createPost}
      />
    </Wrapper>
  );
}

FeedItem.propTypes = {
  item: PropTypes.shape(),
  feedName: PropTypes.string,
  onAddFeed: PropTypes.func,
  createPost: PropTypes.func,
};

export default FeedItem;
