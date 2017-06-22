import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

function PPSearch({ borderRadius, ...props }) {
  return (
    <Wrapper borderRadius={borderRadius}>
      <input {...props} />
      <i className="fa fa-search" />
    </Wrapper>
  );
}

PPSearch.propTypes = {
  borderRadius: PropTypes.number,
};

PPSearch.defaultProps = {
  borderRadius: 3,
};

export default PPSearch;
