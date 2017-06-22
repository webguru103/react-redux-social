import React, { PropTypes } from 'react';

import styles from './styles.scss';

const PPRadioButton = (props) => {
  return (
    <div className={[styles.radio, props.className].join(' ')}>
	    <input id={"custom-radio-" + props.value} type="radio" name={props.name} value={props.value} checked={props.checked} onChange={props.onChange} />
	    <label htmlFor={"custom-radio-" + props.value}>{ props.label }</label>
	  </div>
  );
};

PPRadioButton.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PPRadioButton;

