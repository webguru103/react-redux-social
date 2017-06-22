import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ErrorWrapper from '../ErrorWrapper';

import Wrapper from './Wrapper';
import PostSetDetail from './PostSetDetail';
import PostSetList from './PostSetList';

class PostSetBox extends Component {
  static propTypes = {
    owned: PropTypes.bool,
    postSets: ImmutablePropTypes.list,
    streamName: PropTypes.string,
    handlePostSet: PropTypes.func,
  }

  state = {
    currentPostSetIndex: 0,
  }

  handleSelectPostSet = (index) => {
    this.setState({
      currentPostSetIndex: index,
    });
  }

  render() {
    const { owned, postSets, streamName, handlePostSet } = this.props;
    const { currentPostSetIndex } = this.state;

    if (postSets.isEmpty()) {
      return (
        <Wrapper>
          <ErrorWrapper>
            No posts have been added to this stream.
          </ErrorWrapper>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <PostSetList
          postSets={postSets}
          streamName={streamName}
          currentPostSetIndex={currentPostSetIndex}
          handleSelectPostSet={this.handleSelectPostSet}
        />
        <PostSetDetail
          owned={owned}
          postSet={postSets.get(currentPostSetIndex)}
          handlePostSet={handlePostSet}
        />
      </Wrapper>
    );
  }
}

export default PostSetBox;
