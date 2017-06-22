import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import CloseButtonWrapper from './CloseButtonWrapper';

function Tag({ remove, tag }) {
  return (
    <Wrapper>
      <span className="title">{tag}</span>
      <CloseButtonWrapper onClick={() => remove(tag)}>x</CloseButtonWrapper>
    </Wrapper>
  );
}

Tag.propTypes = {
  remove: PropTypes.func,
  tag: PropTypes.string,
};

export default Tag;
