import React from 'react';

import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Nav = (props) => (
  <div>
    <TopNav {...props} />
    <Sidebar {...props} />
  </div>
);

export default Nav;
