import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import Button from 'elements/atm.Button';

const Wrapper = styled.div`
  font-family: Lato;
  width: ${(props) => props.type === 'link' ? '70%' : '80%'};
  border-bottom: 1px solid #DBDFE0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 15px 0;
`;

const InfoWrapper = styled.div`
  flex: 1;
  width: 0;
  margin-right: 20px;
  a {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  a:hover{
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
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const Intro = styled.p`
  color: #616669;
  font-size: 12px;
  margin: 0;
  padding: 0;
  margin-bottom: 24px;
  margin-top: 16px;
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

const ImageWrapper = styled.div`
  width: 160px;
  min-width: 160px;
  height: 120px;
  a {
    display: flex;
    width: 100%;
    height: 100%;
  }
  img {
    max-width: 100%;
    height: auto;
    max-height: 100%;
    display: block;
    margin: auto;
  }
`;

function SearchItem({ item, handleClick }) {
  console.log(item)
  return (
    <Wrapper type={item.media_type}>
      {item.media_type === 'link' &&
        <Content>
          <InfoWrapper>
            <a href={item.source_url} target="_blank">
              <Title>{item.title}</Title>
              <Intro>{renderHTML(item.description)}</Intro>
              <SourceWrapper>
                <p>{item.media_base_url}</p>
              </SourceWrapper>
            </a>
          </InfoWrapper>
          <Button
            label="Add to Library"
            style={{ background: '#8C9496' }}
            neutral={false}
            onClick={(e) => { e.preventDefault(); handleClick(item.source_url); }}
          />
        </Content>
      } {
        item.media_type === 'video' &&
        <Content>
          <ImageWrapper>
            <a href={item.source_url} target="_blank">
              <img role="presentation" src={item.thumbnail_url} />
            </a>
          </ImageWrapper>
          <InfoWrapper style={{ padding: '10px 20px' }}>
            <a href={item.source_url} target="_blank">
              <Title style={{ height: 51 }}>{item.title}</Title>
              <SourceWrapper>
                <p>{item.source_provider}</p>
              </SourceWrapper>
            </a>
          </InfoWrapper>
          <Button
            label="Add to Library"
            style={{ background: '#8C9496' }}
            neutral={false}
            onClick={(e) => { e.preventDefault(); handleClick(item.source_url); }}
          />
        </Content>
      }
    </Wrapper>
  );
}

SearchItem.propTypes = {
  item: PropTypes.shape(),
  handleClick: PropTypes.func,
};

export default SearchItem;
