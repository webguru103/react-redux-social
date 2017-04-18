/*
 * Media Item Library
 *
 *
 */
import React, { PropType } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { fetchCollections } from './actions';

import MediaNav from './MediaNav';
import MediaContainer from './MediaContainer';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.openAddBlog = this.openAddBlog.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openAddRSS = this.openAddRSS.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
  }

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
  }

  openAddFile() {
    console.log('open add file');
  }

  openAddRSS() {
    console.log('open add RSS');
  }

  openAddLink() {
    console.log('open add link');
  }

  openAddBlog() {
    console.log('open add blog');
  }

  render() {
    return (
      <div>
        <MediaNav openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} />
        <MediaContainer />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
  };
}

const mapStateToProps = createStructuredSelector({

});

MediaItemLibrary.propTypes = {
  getMediaItems: PropType.func,
  params: PropType.any,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));
