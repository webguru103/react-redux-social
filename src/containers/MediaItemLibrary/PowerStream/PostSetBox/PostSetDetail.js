import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import MediaItemPreview from 'components/MediaItemPreview';

import Button from 'elements/atm.Button';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  padding: 20px 40px;
  float: left;
  overflow: auto;
`;
const Content = styled.div`
  width: 400px;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  flex: 1;
  margin-right: 26px;
  color: #6F6F6F;
  font-size: 18px;
  word-break: break-all;
`;
const UserAndTime = styled.div`
  margin-top: 9px;
  font-size: 12px;
  line-height: 15px;
  color: #8C9496;
`;
const Message = styled.div`
  margin-top: 24px;
  margin-bottom: 21px;
  color: #616669;
  font-size: 12px;
  line-height: 15px;
`;

const PostSetDetail = ({
  owned,
  postSet,
  handlePostSet,
}) => (
  <Wrapper>
    <Content>
      <TitleRow>
        <Title>
          { postSet.get('title') }
        </Title>
        <Button
          primary
          onClick={() => handlePostSet(owned, postSet)}
        >
          { owned ? 'Remove from Stream' : 'Add to Posts' }
        </Button>
      </TitleRow>
      <UserAndTime>
        created by { postSet.get('user_id') }
      </UserAndTime>
      <Message>
        { postSet.get('message') }
      </Message>
      <MediaItemPreview
        mediaItems={postSet.get('media_items')}
      />
    </Content>
  </Wrapper>
);

PostSetDetail.propTypes = {
  owned: PropTypes.bool,
  postSet: ImmutablePropTypes.map,
  handlePostSet: PropTypes.func,
};

PostSetDetail.defaultProps = {
  postSet: new Map(),
};

export default PostSetDetail;
