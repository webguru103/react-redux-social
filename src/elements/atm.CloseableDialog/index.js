import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-toolbox/lib/dialog';

import theme from './styles.scss';

const CloseableDialog = ({ children, onClose, ...rest }) => (
  <Dialog {...rest} theme={theme}>
    { onClose &&
      <div
        style={{ position: 'absolute', top: '30px', right: '25px', cursor: 'pointer' }}
        onClick={onClose}
      >
        &#10005;
      </div>
    }
    { children }
  </Dialog>
);

CloseableDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default CloseableDialog;
