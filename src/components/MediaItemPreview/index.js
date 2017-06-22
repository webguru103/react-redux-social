import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import VideoPlayer from 'react-player';
import renderHTML from 'react-render-html';

import PlaceholderImage from 'assets/images/placeholder.jpg';

const Image = styled.img`
  height: auto;
  width: 100%;
  display: block;
  margin: 0 auto;
`;

const Title = styled.div`
  color: #424647;
  font-size: 15px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
  margin-top: 20px;
  font-family: Lato;
`;

const Description = styled.div`
  font-size: 12px;
  color: #424647;
  text-align: left;
  margin-top: 7px;
  line-height: 16px;
  font-family: Lato;
`;

const Url = styled.div`
  text-transform: uppercase;
  text-align: left;
  color: #8C9496;
  font-family: Lato;
  font-size: 10px;
  font-weight: bold;
  line-height: 12px;
  margin-top: 16px;
`;

const showContent = (items) => {
  const contents = [];

  items.map((item) => {
    const type = item.get('type');
    const thumbSrc = item.getIn(['properties', 'thumb_url'])
      || item.getIn(['properties', 'picture'])
      || PlaceholderImage;

    let media = <div />;

    switch (type) {
      case 'image':
        media = (<Image src={thumbSrc} />);
        break;
      case 'video':
        media = (<VideoPlayer
          style={{ margin: '0 auto' }}
          width={'initial'}
          height={'initial'}
          url={item.getIn(['properties', 'source_url'])} controls
        />);
        break;
      case 'link':
        media = (<div>
          <Image src={thumbSrc} />
          <Title>{item.getIn(['properties', 'description'])}</Title>
          <Description>{item.getIn(['properties', 'caption'])}</Description>
          <Url>{item.getIn(['properties', 'link'])}</Url></div>);
        break;
      case 'blog':
        media = (<div>
          <Title>{item.getIn(['properties', 'caption'])}</Title>
          <Description>{item.getIn(['properties', 'title'])}</Description>
          {renderHTML(item.getIn(['properties', 'html']))}
        </div>);
        break;
      default:
        media = <Image src={thumbSrc} />;
        break;
    }
    return contents.push(media);
  });

  return contents;
};

function MediaItemPreview({ mediaItems }) {
  return (
    <div>{mediaItems && showContent(mediaItems)}</div>
  );
}

MediaItemPreview.propTypes = {
  mediaItems: ImmutablePropTypes.list,
};

export default MediaItemPreview;
