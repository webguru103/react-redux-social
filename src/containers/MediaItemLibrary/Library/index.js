/*
 * Media Item Library
 *
 *
 */
 
import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as dialogs from 'react-toolbox-dialogs'
import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import { routerActions } from 'react-router-redux'

import { 
  fetchCollections,
  fetchUrlData,
  clearUrlContent,
  createMediaItem,
  searchWeb,
  getFeeds,
  getRSSItems,
  createFeed,
  setVisibilityFilter,
  setSearchFilter,
  deleteMediaItem,
  toggleProccessingItem,
} from '../actions';

import {
  makeSelectUrlContent,
  makeSelectActiveCollection,
  makeSelectMediaItems,
  makeSelectSearchResults,
  makeSelectFeeds,
  makeSelectRSSItems,
  makeSelectFilter,
  makeSelectProcessingItem,
} from '../selectors';

import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import MediaNav from '../MediaNav';
import MediaContainer from '../MediaContainer';
import Wrapper from '../Wrapper';
import PreviewDialog from '../PreviewDialog';

class MediaItemLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewDialog: false,
      previewItem: {properties: {}},
    };
    
    this.openPreview = this.openPreview.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.setSearchFilter = this.setSearchFilter.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.openEditor = this.openEditor.bind(this);
  }

  componentDidMount() {
    this.props.setSearchFilter("");
    this.props.getMediaItems(this.props.params.account_id);
  }

  
  openPreview(item) {
    this.setState({ previewDialog: true, previewItem: item });
  }
  
  async onConfirmDelete(id) {
    const result = await dialogs.confirm('Delete', 'Are you sure you want to delete this item?');
    console.log(result + id);
    if (result) {
      this.props.deleteMediaItem(id);
    } else {
      return;
    }
  }
  
  closeAllDialog() {
    this.setState({ 
      previewDialog: false,
      previewItem: {properties: {}},
    });
  }
  
  handleLinkEditorSave(linkItem) {
    this.setState({ linkEditorDialog: false });
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(linkItem.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + linkItem.picture, (Blob) => {
        console.log(Blob);
        linkItem.picture = Blob.url;
        linkItem.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + linkItem.picture,
           (Blob) => {
            linkItem.thumb_key = Blob.key;
            linkItem.collection_id = this.props.activeCollection.collection_id;
            console.log(linkItem);
            linkItem.mediaItemType="link";
            this.props.createMediaItem(linkItem);
          });
      });
    } else {
      linkItem.mediaItemType="link";
      this.props.createMediaItem(linkItem);
    }
  }
  
  setSearchFilter(event) {
    this.props.setSearchFilter(event.target.value);
  }
  
  setSortOrder(event) {
    this.setState({ sortOrder: event.value });
    this.props.setSortOrder(event.value)
  }
  
  openEditor(mediaItem) {
    if(mediaItem.type === 'image') {
      this.props.openImageEditor(mediaItem);
    } else if (mediaItem.type === 'link') {
      this.props.openLinkEditor(mediaItem);
    } else if (mediaItem.type === 'video') {
      this.props.openVideoEditor(mediaItem);
    } else if (mediaItem.type === 'document') {
      this.props.openFileEditor(mediaItem);
    }
  }
  
  render() {
    return (
      <Wrapper>
        <MediaNav filter={this.props.filter} setSortOrder={this.setSortOrder} setSearchFilter={this.setSearchFilter} openAddFile={this.openAddFile} openAddRSS={this.openAddRSS} openAddLink={this.openAddLink} openAddBlog={this.openAddBlog} openSearch={this.openSearch} 
        sortOrder={this.state.sortOrder} />
        <MediaContainer createPostSet={this.props.createPostSet} pushToEditor={this.props.pushToEditor} query={this.props.location.query} processingItem={this.props.processingItem} mediaItems={this.props.mediaItems} onConfirmDelete={this.onConfirmDelete.bind(this)} openPreview={this.openPreview} openEditor={this.openEditor} />
        <PreviewDialog 
          createPostSet={this.props.createPostSet}
          closeAllDialog={this.closeAllDialog}
          previewDialog={this.state.previewDialog}
          mediaItem={this.state.previewItem}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    setSearchFilter: (searchFilter) => dispatch(setSearchFilter(searchFilter)),
    deleteMediaItem: (id) => dispatch(deleteMediaItem(id)),
    setProcessingItem: (processingItem) => dispatch(toggleProccessingItem(processingItem)),
    pushToEditor: (accountId, postSetId, mediaItem) => dispatch(routerActions.push({ pathname: postSetId, query: { item: JSON.stringify(mediaItem) } })),
  };
}

const mapStateToProps = createStructuredSelector({
  filePickerKey: makeSelectFilePickerKey(),
  activeCollection: makeSelectActiveCollection(),
  mediaItems: makeSelectMediaItems(),
  searchResults: makeSelectSearchResults(),
  filter: makeSelectFilter(),
  processingItem: makeSelectProcessingItem(),
});

MediaItemLibrary.propTypes = {
  getMediaItems: PropTypes.func,
  params: PropTypes.any,
  fetchUrlData: PropTypes.func,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(MediaItemLibrary));
