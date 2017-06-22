import React from 'react';
import PropTypes from 'prop-types';

import PPInput from 'elements/atm.Input';

import Wrapper from './Wrapper';

import theme from './styles.scss';

function MultiLineInput({ disabled, highlightFocus, name, placeholder, message, handleMessageChange, onBlur, noPadding, hasBorder }) {
  return (
    <Wrapper className={`${highlightFocus ? theme.highlightFocus : ''} ${noPadding && theme.noPadding} ${hasBorder && theme.hasBorder}`}>
      <PPInput
        multiline
        disabled={disabled}
        type="text"
        hint={placeholder}
        name={name}
        value={message}
        onChange={handleMessageChange}
        onBlur={onBlur}
        theme={theme}
      />
    </Wrapper>
  );
}

MultiLineInput.propTypes = {
  disabled: PropTypes.bool,
  highlightFocus: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  handleMessageChange: PropTypes.func,
  onBlur: PropTypes.func,
  noPadding: PropTypes.bool,
  hasBorder: PropTypes.bool,
};

MultiLineInput.defaultProps = {
  disabled: false,
  highlightFocus: true,
  name: 'messageInput',
  placeholder: 'Write something here',
};

export default MultiLineInput;
