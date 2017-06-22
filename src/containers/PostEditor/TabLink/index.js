import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

const TabLink = (props) =>
  <Link
    to={props.to}
    activeClassName={props.graySelect ? styles.graySelectActive : styles.active}
    className={styles.tabLinkStyle}
    style={props.style}
  >
    {props.label}
    {props.count !== undefined &&
      <span className={styles.countStyle}>{props.count}</span>
    }
    {props.children}
  </Link>;

TabLink.propTypes = {
  to: PropTypes.string,
  graySelect: PropTypes.bool,
  label: PropTypes.string,
  count: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.any,
};


export default TabLink;
