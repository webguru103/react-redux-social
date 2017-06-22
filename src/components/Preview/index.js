import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-player';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';

const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: auto;
  max-height: 100%;
`;

const LinkTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  color: #424647;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  margin-top: 15px;
`;

const LinkDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  font-size: 12px;
   color: #424647;
   text-align: left;
   margin-bottom: 10px;
`;

const LinkUrl = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  text-transform: uppercase;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  color: #8C9496;
`;

const DocumentWrapper = styled.div`
  display: flex;
`;

const download = (url) => {
  setTimeout(() => {
    const response = {
      file: url,
    };
    window.open(response.file);
  }, 100);
};

const Preview = ({ item }) => {
  const type = item.type;

  let image = '';
  let size = '';
  switch (type) {
    case 'link':
      image = item.properties.thumb_url || item.properties.picture_url;
      break;
    case 'document':
      image = item.properties.picture;
      size = `${(item.properties.size / 1024 / 1024).toFixed(2)} MB`;
      break;
    case 'image':
      image = item.properties.thumb_url || item.properties.source_url;
      break;
    case 'video':
    case 'blog':
    default:
      image = '';
      break;
  }

  return (
    <Wrapper>
      {type === 'video' &&
        <div>
          <LinkTitle style={{ marginBottom: '10px' }}>{item.properties.filename}</LinkTitle>
          <VideoPlayer
            style={{ margin: '0 auto' }}
            width={'initial'}
            height={'initial'}
            url={item.properties.source_url}
            controls
            playing
          />
        </div>
      }
      {type === 'link' &&
        <div>
          <Image src={image} />
          <LinkTitle>{item.properties.title}</LinkTitle>
          <LinkDescription>{item.properties.description}</LinkDescription>
          <LinkUrl>{item.properties.link}</LinkUrl>
        </div>
      }
      {type === 'image' && <Image src={image} />}
      {type === 'blog' && renderHTML(item.properties.html)}
      {type === 'document' &&
        <DocumentWrapper>
          <img src={image} role="presentation" style={{ width: '200px', height: '200px' }} />
          <div style={{ padding: '30px' }}>
            <LinkTitle>{item.properties.title}</LinkTitle>
            <LinkDescription>{item.properties.description}</LinkDescription>
            <Button label={`${size} Download`} style={{ marginTop: '20px' }} onClick={() => download(item.properties.source_url)} />
          </div>
        </DocumentWrapper>
      }
    </Wrapper>
  );
};

Preview.propTypes = {
  item: PropTypes.shape(),
};

export default Preview;
