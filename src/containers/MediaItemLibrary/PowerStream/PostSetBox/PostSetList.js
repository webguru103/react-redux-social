import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import moment from 'moment';

import PostSetItem from './PostSetItem';

const Wrapper = styled.div`
  width: 40%;
  height: 100%;
  float: left;
  overflow-y: auto;
`;

const PostSetList = ({
  postSets,
  currentPostSetIndex,
  streamName,
  handleSelectPostSet,
}) => (
  <Wrapper>
    {
      postSets.map((p, index) => (
        <PostSetItem
          key={index}
          active={currentPostSetIndex === index}
          mediaItems={p.get('media_items')}
          streamName={streamName}
          title={p.get('title')}
          message={p.get('message')}
          date={moment(p.get('creation_time') * 1000).format('MMM DD')}
          type={p.get('post_type')}
          onClick={() => handleSelectPostSet(index)}
        />
      ))
    }
  </Wrapper>
);

PostSetList.propTypes = {
  postSets: ImmutablePropTypes.list,
  currentPostSetIndex: PropTypes.number,
  streamName: PropTypes.string,
  handleSelectPostSet: PropTypes.func,
};

export default PostSetList;
