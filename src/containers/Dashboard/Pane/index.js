import React from 'react';

import Wrapper from './Wrapper';

const Pane = ({ children }) => (<Wrapper>
  { children }
</Wrapper>);

Pane.propTypes = { children: React.PropTypes.array.isRequired };

export default Pane;
