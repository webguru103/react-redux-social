import React from 'react';

import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Nav = (props) => (
  <div>
    <Sidebar {...props} />
    <TopNav {...props} />
  </div>
);

export default Nav;
