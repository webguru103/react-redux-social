import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

const TabLink = (props) => <Link to={props.to} activeClassName={styles.active} className={styles.tabLinkStyle} style={props.style}>{props.label} {props.children}</Link>;

TabLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};


export default TabLink;
