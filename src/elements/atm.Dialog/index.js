import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';

import theme from './styles.scss';

const PPDialog = (props) => (
  <Dialog {...props} theme={theme} />
);

export default PPDialog;
