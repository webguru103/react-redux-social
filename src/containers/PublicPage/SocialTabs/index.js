import React from 'react';

import Wrapper from './Wrapper';

function SocialTabs() {
  return (
    <Wrapper>
      <h3>Share Post</h3>
      <div className="tabs">
        <i className="fa fa-facebook-square" />
        <i className="fa fa-twitter-square" />
        <i className="fa fa-linkedin-square" />
        <i className="fa fa-pinterest-square" />
      </div>
    </Wrapper>
  );
}

export default SocialTabs;
