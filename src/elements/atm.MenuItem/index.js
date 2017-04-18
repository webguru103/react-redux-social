import React, { PropTypes } from 'react';
import { MenuItem } from 'react-toolbox/lib/menu';

import theme from './styles.scss';
import sidebarTheme from './sidebarStyles.scss';

const PPMenuItem = (props) => {
  const { isSidebar, ...rest } = props;

  return (
    <MenuItem {...rest} theme={isSidebar ? sidebarTheme : theme} />
  );
};

PPMenuItem.propTypes = {
  isSidebar: PropTypes.bool,
  rest: PropTypes.any,
};

export default PPMenuItem;
