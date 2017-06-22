import React, { PropTypes } from 'react';
import { find } from 'lodash';

import MediaNavContainer from './MediaNavContainer';

import ButtonMenu from 'elements/mol.ButtonMenu';
import MenuItem from 'elements/atm.MenuItem';
import TextField from 'elements/atm.TextField';
import Dropdown from 'elements/atm.Dropdown';
import FilterLink from '../FilterLink';

import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_VIDEOS,
  SHOW_LINKS,
  SHOW_IMAGES,
} from '../constants';

import styles from './styles.scss';

const sortOptions = [
  { value: 'date', label: 'Date added' },
  { value: 'title', label: 'Title' },
];

const MediaNav = (props) => (
  <MediaNavContainer className="row">
    <div className="col-md-6">
      <FilterLink filter={SHOW_ALL} active={props.filter === SHOW_ALL}>All</FilterLink>
      <FilterLink filter={SHOW_BLOGS} active={props.filter === SHOW_BLOGS}>Blogs</FilterLink>
      <FilterLink filter={SHOW_IMAGES} active={props.filter === SHOW_IMAGES}>Images</FilterLink>
      <FilterLink filter={SHOW_LINKS} active={props.filter === SHOW_LINKS}>Links</FilterLink>
      <FilterLink filter={SHOW_VIDEOS}active={props.filter === SHOW_VIDEOS}>Videos</FilterLink>
    </div>
    <div className="col-md-3"style={{ height: '100%'}}>
      <TextField iconClass="fa fa-search" hintText="Search Title" style={{float: 'left'}} onChange={props.setSearchFilter} />
    </div>
    <div className="col-md-3">
      <Dropdown label="Sort By" style={{float: 'right'}} options={sortOptions} onChange={props.setSortOrder} value={find(sortOptions, ['value', props.sortOrder])} />
    </div>
  </MediaNavContainer>
);

MediaNav.propTypes = {
  openAddFile: PropTypes.func,
  openAddRSS: PropTypes.func,
  openAddBlog: PropTypes.func,
  openAddLink: PropTypes.func,
};

export default MediaNav;
