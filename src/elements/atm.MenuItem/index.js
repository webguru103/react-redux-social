import React, { PropTypes } from 'react';
import { MenuItem } from 'react-toolbox/lib/menu';

import theme from './styles.scss';
import sidebarTheme from './sidebarStyles.scss';
import collapseTheme from './collapsedSidebarStyles.scss';

const PPMenuItem = (props) => {
  const { isSidebar, isCollapsed, ...rest } = props;
  let newTheme = theme;
  if (isSidebar) {
    newTheme = sidebarTheme;
  }
  if (isSidebar && isCollapsed) {
    newTheme = collapseTheme;
  }
  return (
    <MenuItem {...rest} theme={newTheme} />
  );
};

PPMenuItem.propTypes = {
  isSidebar: PropTypes.bool,
  rest: PropTypes.any,
};

export default PPMenuItem;
