import React, { PropTypes } from 'react';

import styles from './styles.scss';

const TextField = (props) => {
  const errorStyles = props.errorText ? styles.errorBackground : '';

  return (
    <div className={styles.textFieldContainer} style={props.style}>
      {
        props.floatingLabelText !== undefined &&
        <label className={styles.labelStyles} htmlFor={props.htmlFor}>{props.floatingLabelText}</label>
      }
      <label className={styles.rightLabelStyles} htmlFor={props.htmlFor}>{props.rightLabelText}</label>
      <div className={styles.inputContainer} >
        <input
          className={props.iconClass ? styles.inputStylesWithIcon : `${styles.inputStyles} ${errorStyles}`}
          type={props.type}
          name={props.name}
          value={props.value}
          maxLength={props.maxLength}
          disabled={props.disabled}
          placeholder={props.hintText}
          onBlur={props.onBlur}
          onChange={props.onChange}
        />
        { props.iconClass && <i className={props.iconClass} /> }
      </div>
      <div className={styles.errorContainer}>
        { props.errorText }
      </div>
    </div>
  );
};

TextField.propTypes = {
  floatingLabelText: PropTypes.string,
  rightLabelText: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
  hintText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  iconClass: PropTypes.string,
  errorText: PropTypes.string,
  htmlFor: PropTypes.any,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default TextField;

