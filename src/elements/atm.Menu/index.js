import React, { PropTypes } from 'react';
import { Menu } from 'react-toolbox/lib/menu';

import theme from './styles.scss';
import sidebarTheme from './sidebarStyles.scss';

const PPMenu = (props) => {
  const { isSidebar } = props;

  return (
    <Menu {...props} theme={isSidebar ? sidebarTheme : theme} />
  );
};

PPMenu.propTypes = {
  isSidebar: PropTypes.bool,
};

export default PPMenu;
