import React, { PropTypes } from 'react';

import ButtonMenu from 'elements/mol.ButtonMenu';
import MenuItem from 'elements/atm.MenuItem';

import styles from './styles.scss';

const MediaNav = (props) => (
  <div className={styles.mediaNavContainer}>
    <ButtonMenu label="Add Media">
      <MenuItem caption="Add File" onClick={props.openAddFile} />
      <MenuItem caption="Add RSS Feed" onClick={props.openAddRSS} />
      <MenuItem caption="Add Blog" onClick={props.openAddBlog} />
      <MenuItem caption="Add Link" onClick={props.openAddLink} />
    </ButtonMenu>
  </div>
);

MediaNav.propTypes = {
  openAddFile: PropTypes.func,
  openAddRSS: PropTypes.func,
  openAddBlog: PropTypes.func,
  openAddLink: PropTypes.func,
};

export default MediaNav;
