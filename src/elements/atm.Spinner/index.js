import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import Theme from './styles.scss';

const Spinner = (props) => <ProgressBar type="circular" mode="indeterminate" theme={Theme} />;

export default Spinner;