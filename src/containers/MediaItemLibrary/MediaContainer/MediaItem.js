import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IconButton } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import Tooltip from 'react-toolbox/lib/tooltip';
import withReactRouter from 'elements/hoc.withReactRouter';


const IconButtonTooltip = Tooltip(IconButton);
const IconLink = withReactRouter(IconButtonTooltip);

const Wrapper = styled.div`
  width: 250px;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
  display: inline-block;
  margin: 15px;
  position: relative;
  float: left;
`;

const Footer = styled.div`
  height: 48px;
  width: 250px;
  padding: 10px;
`;

const Title = styled.div`
  font-family: Lato-Bold;
  font-size: 13px;
  color: #616668;
  letter-spacing: 0;
  width: 80%;
  text-align: left;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis; 
`;

const Icon = styled.div`
  width: 20%;
  text-align: right;
  float: right;
`;

const CoverImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: calc(252px - 48px + 25px);
  text-align: center;
  line-height: 229px;
`;

const ActionBar = styled.div`
  width: 100%;
  text-align: right;
`;

const IconPlaceholder = styled.i`
  width: 100%;
  height: 100%;
  font-size: 64px;
  color: #8C9497;
`;

const MediaItem = (props) => {
  const coverImage = props.mediaItem.properties.picture || props.mediaItem.properties.thumb_url || '';
  const mediaType = props.mediaItem.type;
  const creationTime = props.mediaItem.creation_time;
  const title = props.mediaItem.properties.title || props.mediaItem.properties.filename || props.mediaItem.properties.description;
  let icon = 'photo';
  let fa = 'fa-picture-o'
  if (props.mediaItem.type === 'link') {
    fa = 'fa-link';
    icon = 'link';
  } else if (props.mediaItem.type === 'video') {
    fa = 'fa-video-camera';
    icon = 'videocam';
  } else if (props.mediaItem.type === 'blog' || props.mediaItem.type === 'document') {
    fa = 'fa-file-text';
    icon = 'description';
  }
  if ( props.mediaItem.status === 0) {
    return;
  }
  let EditorLink = <IconButtonTooltip icon='edit' tooltip="Edit" onClick={() => props.openEditor(props.mediaItem)} />;
  if (props.mediaItem.type === 'blog') {
    EditorLink = <IconLink to={`/account/${props.mediaItem.account_id}/library/blog/${props.mediaItem.media_item_id}`} icon="edit" tooltip="Edit" />;
  }
  return(
    <Wrapper>
      <ImageContainer>
      { coverImage ? (<CoverImage src={coverImage} />) : (<IconPlaceholder className={`fa ${fa}`} />) }
      </ImageContainer>
      <Footer>
        <Title>{title}</Title>
        <Icon><FontIcon value={icon} /></Icon>
      </Footer>
      <ActionBar>
        {!props.inPostEditor ? (
        <IconButtonTooltip icon='add' tooltip="Create Post" onClick={() => props.createPostSet(props.mediaItem)} />
        ) : ( <IconButtonTooltip icon='add' tooltip="Add to Post" onClick={() => props.addToPost(props.mediaItem)} />)
        }
        {!props.inPostEditor &&
        <div style={{display: 'inline-block'}}>
          {EditorLink}
          <IconButtonTooltip icon='remove_red_eye' tooltip="View" onClick={() => props.openPreview(props.mediaItem)} />
          <IconButtonTooltip icon='delete_forever' tooltip="Delete" onClick={() => props.onDelete(props.mediaItem.media_item_id)} />
        </div>
        }
      </ActionBar>
    </Wrapper>
  );
};

export default MediaItem;