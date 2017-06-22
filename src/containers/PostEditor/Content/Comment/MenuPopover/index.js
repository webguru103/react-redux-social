/*
* Content
* Menu Popover to remove a comment
*/

import React, { PropTypes } from 'react';

import styles from './styles.scss';

const MenuPopover = ({ onDelete, show }) =>
  <div className={[styles.menuPopover, show ? styles.active : ''].join(' ')} onClick={onDelete}>
    <i className="fa fa-trash-o" />
    Delete
  </div>;

MenuPopover.propTypes = {
  onDelete: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default MenuPopover;
