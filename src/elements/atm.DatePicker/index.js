import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';

import theme from './styles.scss';

const PPDatePicker = (props) => (
  <DatePicker {...props} theme={theme} />
);

export default PPDatePicker;
