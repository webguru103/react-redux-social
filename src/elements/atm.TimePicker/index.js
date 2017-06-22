import React from 'react';
import TimePicker from 'react-toolbox/lib/time_picker';

import theme from './styles.scss';

const PPTimePicker = (props) => (
  <TimePicker {...props} theme={theme} />
);

export default PPTimePicker;
