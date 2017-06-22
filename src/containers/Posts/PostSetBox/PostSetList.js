import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import moment from 'moment';

import PostSetItem from './PostSetItem';

const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const PostSetList = ({
  postSets,
  currentPostSetIndex,
  streamName,
  handleSelectPostSet,
  time,
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
          date={p.get(time)
            ? moment(p.get(time) * 1000).format('MMM DD')
            : ((p.get('status') === '3' && 'Post When Ready') || 'Unscheduled')
          }
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
  time: PropTypes.string,
};

export default PostSetList;
