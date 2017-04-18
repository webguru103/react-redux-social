import React from 'react';
import Input from 'react-toolbox/lib/input';

import theme from './styles.scss';

const PPButtonInput = (props) => <Input {...props} theme={theme} floating={false} />;

export default PPButtonInput;
