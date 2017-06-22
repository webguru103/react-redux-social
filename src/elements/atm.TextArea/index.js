import React, { PropTypes } from 'react';

import styles from './styles.scss';

const TextField = ({ resizable = false, ...props }) => {
  const errorStyles = props.errorText ? styles.errorBackground : '';

  return (
    <div className={styles.textFieldContainer} style={props.style}>
      <label className={styles.labelStyles} htmlFor={props.htmlFor}>{props.floatingLabelText}</label>
      <label className={styles.rightLabelStyles}>{props.rightLabelText}</label>
      <div className={styles.inputContainer} >
        <textarea style={!resizable && { resize: 'none' }} className={props.iconClass ? styles.inputStylesWithIcon : `${styles.inputStyles} ${errorStyles}`} name={props.name} value={props.value} rows={props.rows} cols={props.cols} maxLength={props.maxLength} placeholder={props.hintText} onChange={props.onChange}/>
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
  name: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  style: PropTypes.object,
  hintText: PropTypes.string,
  onChange: PropTypes.func,
  iconClass: PropTypes.string,
  errorText: PropTypes.string,
  htmlFor: PropTypes.any,
  maxLength: PropTypes.number,
  resizable: PropTypes.bool,
};

export default TextField;
