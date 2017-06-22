/*
 * Library View
 *
 *
 */

import React, { PropTypes } from 'react';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import styled from 'styled-components';
import { connect } from 'react-redux';
import filepicker from 'filepicker-js';

import Button from 'elements/atm.Button';
import MenuItem from 'elements/atm.MenuItem';
import Menu from 'elements/atm.Menu';
import { createStructuredSelector } from 'reselect';
import withReactRouter from 'elements/hoc.withReactRouter';
import styles from './styles.scss';
import LinkDialog from './LinkDialog';
import LinkEditor from './LinkEditor';
import ImageEditor from './ImageEditor';
import VideoEditor from './VideoEditor';
import FileEditor from './FileEditor';
import PostEditor from 'containers/PostEditor';

import DropdownMenu from 'react-dd-menu';

import {
  createPostSetRequest,
} from 'containers/App/actions';

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
  updateMediaItem,
  setSortOrder,
  setActiveMediaItemId,
} from './actions';

import {
  makeSelectUrlContent,
  makeSelectActiveCollection,
  makeSelectMediaItems,
  makeSelectSearchResults,
  makeSelectFeeds,
  makeSelectRSSItems,
  makeSelectFilter,
  makeSelectProcessingItem,
  makeSelectActiveMediaItem,
} from './selectors';

import {
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';

const DropDownMenu = styled(DropdownMenu)`
 .dd-menu-items {
    z-index: 3333;
    position: absolute;
    right: 20px;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    ul {
      padding: 0;
      width: 150px;
      text-align:center;
    }
  }
`;

const HR = styled.hr`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 50%;
  border-top: solid 2px #DBDFE0;
`;

const NormalHR = styled.hr`
  border-top: solid 2px #DBDFE0;
`;

const ContentWrapper = styled.div`
  float: right;
  width: calc(100% - 177px);
  height: 100%;
`;

const SidebarWrapper = styled.div`
  width: 177px;
  height: 100vh;
  position:fixed;
  border-right: 2px solid #DBDFE0;
  padding: 5px;
  padding-top: 15px;
`;

const ReactRouterMenuItem = withReactRouter(MenuItem);

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkDialog: false,
      addLinkValue: '',
      addLinkValueError: '',
      linkEditorDialog: false,
      imageEditorDialog: false,
      videoEditorDialog: false,
      fileEditorDialog: false,
      imageItem: {},
      linkItem: {},
      videoItem: {},
      fileItem: {},
      addMenuOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.openAddLink = this.openAddLink.bind(this);
    this.openFileEditor = this.openFileEditor.bind(this);
    this.openImageEditor = this.openImageEditor.bind(this);
    this.openLinkEditor = this.openLinkEditor.bind(this);
    this.openAddFile = this.openAddFile.bind(this);
    this.openVideoEditor = this.openVideoEditor.bind(this);
    this.closeAllDialog = this.closeAllDialog.bind(this);
    this.handleLinkEditorSave = this.handleLinkEditorSave.bind(this);
    this.handleFileEditorSave = this.handleFileEditorSave.bind(this);
    this.handleImageEditorSave = this.handleImageEditorSave.bind(this);
    this.handleOpenAddFile = this.handleOpenAddFile.bind(this);
    this.handleAddLinkValue = this.handleAddLinkValue.bind(this);
    this.handleVideoEditorSave = this.handleVideoEditorSave.bind(this);
    this.handleAddLinkValueFromDialog = this.handleAddLinkValueFromDialog.bind(this);
  }

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.getFeeds(this.props.params.account_id);
  }

  openAddLink() {
    this.setState({ linkDialog: true });
  }

  openLinkEditor(linkItem) {
    if (linkItem) {
      this.setState({ linkEditorDialog: true, linkItem: linkItem });
    } else {
      this.setState({ linkEditorDialog: true });
    }
  }

  openFileEditor(fileItem) {
    this.setState({ fileEditorDialog: true, fileItem: fileItem });
  }

  openImageEditor(imageItem) {
    this.setState({ imageEditorDialog: true, imageItem: imageItem });
  }

  openVideoEditor(videoItem) {
    this.setState({ videoEditorDialog: true, videoItem: videoItem });
  }

  handleRequestClose() {
    this.setState({
      addMenuOpen: false,
    });
  }

  openAddFile() {
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
        buttonText: 'Upload',
        container:'modal',
        multiple: false,
        maxFiles: 1,
        imageQuality: 80,
        imageMax: [1200, 1200],
        services: [ 'CONVERT','COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
        conversions: ['crop', 'filter'],
    };
    const filePickerStoreOptions = {
        location: 'S3'
    };
    function onFail(error) {
        console.log('error: ' + error);
    }

    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenAddFile, onFail);
  }

  closeAllDialog() {
    this.setState({
      linkDialog: false,
      linkEditorDialog: false,
      videoEditorDialog: false,
      imageEditorDialog: false,
      fileEditorDialog: false,
      addLinkValueError: '',
      imageItem: {},
      fileItem: {},
      linkItem: {},
      videoItem: {},
    });
    this.props.clearUrlContent();
  }

  handleVideoEditorSave(videoItem) {
    this.setState({ videoEditorDialog: false, videoItem: {} });
    const {action, ...item} = videoItem;
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(item.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + item.picture, (Blob) => {
        console.log(Blob);
        item.picture = Blob.url;
        item.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + item.picture,
           (Blob) => {
            item.thumb_key = Blob.key;
            item.collection_id = this.props.activeCollection.collection_id;
            item.mediaItemType="link";
            if (action === 'create') {
              this.props.createMediaItem(item);
            } else if (action === 'update') {
              this.props.updateMediaItem(item);
            }
          });
      });
    } else {
      if (action === 'update') {
        this.props.updateMediaItem(item);
      } else if (action === 'create') {
        this.props.createMediaItem(item);
      }
    }
  }

  handleFileEditorSave(item) {
    this.setState({ fileEditorDialog: false, fileItem: {} });
    const {action, ...fileItem} = item;
    const filepicker = require('filepicker-js');
    filepicker.setKey(this.props.filePickerKey);
    if(fileItem.picture) {
      filepicker.storeUrl('https://process.filestackapi.com/' + this.props.filePickerKey + '/' + fileItem.picture, (Blob) => {
        console.log(Blob);
        fileItem.picture = Blob.url;
        fileItem.picture_key = Blob.key;
        filepicker.storeUrl(
          'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + fileItem.picture,
           (Blob) => {
            fileItem.thumb_key = Blob.key;
            fileItem.collection_id = this.props.activeCollection.collection_id;
            fileItem.mediaItemType="link";
            if (action === 'create') {
              this.props.createMediaItem(fileItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(fileItem);
            }
          });
      });
    } else {
      if (action === 'update') {
        this.props.updateMediaItem(fileItem);
      } else if (action === 'create') {
        this.props.createMediaItem(fileItem);
      }
    }
  }

  handleLinkEditorSave(item) {
    this.closeAllDialog();
    const {action, ...linkItem} = item;
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
            if (action === 'create') {
              this.props.createMediaItem(linkItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(linkItem);
            }
          });
      });
    } else {
      linkItem.mediaItemType="link";
      if (action === 'create') {
        this.props.createMediaItem(linkItem);
      } else if (action === 'update') {
        this.props.updateMediaItem(linkItem);
      }
    }
  }

  handleImageEditorSave(imageItem) {
    this.setState({ imageEditorDialog: false, imageItem: {} });
    const {action, ...rest} = imageItem;
    if (action === 'update') {
      this.props.updateMediaItem(rest);
    } else if (action === 'create') {
      this.props.createMediaItem(rest);
    }
  }

  handleAddLinkValue(event) {
    this.setState({ addLinkValue: event.target.value });
  }

  handleAddLinkValueFromDialog(link) {
    this.setState({ addLinkValue: link }, () => this.handleAddLinkSubmit());
  }

  handleAddLinkSubmit = () => {
    console.log('in handle add link submit');
    if(this.state.addLinkValue === '') {
      console.log('no link value, abort');
      this.setState({ addLinkValueError: 'A link URL is required'});
      return;
    }
    const linkItem = {
      source: this.state.addLinkValue,
    };

    this.setState({ addLinkValue: '', linkDialog: false, searchDialog: false, rssFeedDialog: false, linkEditorDialog: true });

    this.props.fetchUrlData(this.state.addLinkValue);
  }

  handleOpenAddFile(mediaItem) {
    filepicker.setKey(this.props.filePickerKey);

    if(mediaItem[0].mimetype.match('image')) {

      filepicker.storeUrl(
        'https://process.filestackapi.com/' + this.props.filePickerKey + '/resize=width:300,height:300,fit:clip/' + mediaItem[0].url,
        (Blob) => {
          mediaItem[0]["thumb_key"] = Blob.key;
          mediaItem[0].collection_id = this.props.activeCollection.collection_id;
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
            },
          };
          console.log(mediaItem);
          this.openImageEditor(imageItem);
        });
    } else if(mediaItem[0].mimetype.match('video')) {
      mediaItem[0].collection_id = this.props.activeCollection.collection_id;
      const videoItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
        },
      };
      console.log(mediaItem);
      this.openVideoEditor(videoItem);
    } else  {
      console.log(mediaItem);
      mediaItem[0].collection_id = this.props.activeCollection.collection_id;
      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
        }
      };
      this.openFileEditor(fileItem);
      // this.props.createMediaItem(fileItem);
    }
  }

  toggle() {
    this.setState({ addMenuOpen: !this.state.addMenuOpen });
  }

  createPostSet = (mediaItem) => {
    const { params: { account_id }, createPostSet } = this.props;
    console.log(mediaItem);
    const postSet = {
      account_id: account_id,
      message: '',
      type: 'text',
      status: '6',
      title: '',
      media_item_ids: [mediaItem.media_item_id],
    };
    createPostSet(postSet);
  }

  render() {
    const { location: { hash } } = this.props;
    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;

    const actions = [
      { label: "close", onClick: this.closeAllDialog },
    ];
    const menuOptions = {
      isOpen: this.state.addMenuOpen,
      close: this.handleRequestClose,
      toggle: <Button label="Add New Item" primary onClick={this.toggle} />,
      align: 'left',
    };

    return (
      <Wrapper>
        <SidebarWrapper>
          <div style={{display: 'block', textAlign: 'center'}}>
          <DropDownMenu {...menuOptions} >
            <MenuItem caption="Add File" onClick={this.openAddFile} />
            <MenuItem caption="Add Link" onClick={this.openAddLink} />
          </DropDownMenu>
          </div>
          <Menu style={{margin: '0 auto', padding: '0', width: '150px' }} selectable>
            <ReactRouterMenuItem caption='Media Library' to={`/account/${this.props.params.account_id}/library`} style={{textAlign: 'center'}} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}} />
            <li style={{position: 'relative', listStyle: 'none', height: '40px'}}><span style={{backgroundColor: 'white', position: 'absolute', zIndex: '22', lineHeight: '40px', color: '#616669', paddingRight: '10px', fontSize: '12px'}}>Curate</span><HR /></li>
            <ReactRouterMenuItem caption='RSS Feeds' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/RSS`} style={{color: '#616669', fontWeight: '700', fontSize: '9px !important'}} />
            <ReactRouterMenuItem caption='Search the Web' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/search`} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}} />
            <li style={{position: 'relative', listStyle: 'none', height: '40px'}}><span style={{backgroundColor: 'white', position: 'absolute', zIndex: '22', lineHeight: '40px', color: '#616669', paddingRight: '10px', fontSize: '12px'}}>Shared Streams</span><HR /></li>
            <ReactRouterMenuItem caption='Subscriptions' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/shared_streams/subscriptions`} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}}/>
            <ReactRouterMenuItem caption='Owned' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/shared_streams/owned`} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}}/>
            <li style={{position: 'relative', listStyle: 'none', height: '40px'}}><span style={{backgroundColor: 'white', position: 'absolute', zIndex: '22', lineHeight: '40px', color: '#616669', paddingRight: '10px', fontSize: '12px'}}>Create</span><HR /></li>
            <ReactRouterMenuItem caption='Blog Post' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/blog`} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}} />
            <NormalHR />
            <ReactRouterMenuItem caption='Outsource Your Content' activeClassName={styles.active} to={`/account/${this.props.params.account_id}/library/outsource`} style={{color: '#616669', fontWeight: '700', fontSize: '13px !important'}}/>
          </Menu>
        </SidebarWrapper>
        <ContentWrapper>
        {React.cloneElement(this.props.children, { ...this.props, createPostSet: this.createPostSet, openImageEditor:this.openImageEditor, openLinkEditor:this.openLinkEditor, openVideoEditor: this.openVideoEditor, openFileEditor: this.openFileEditor, handleAddLinkValueFromDialog: this.handleAddLinkValueFromDialog })}
        </ContentWrapper>
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave.bind(this)} linkEditorDialog={this.state.linkEditorDialog} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} linkItem={this.state.linkItem} />
        <ImageEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave.bind(this)} isOpen={this.state.imageEditorDialog} filePickerKey={this.props.filePickerKey} imageItem={this.state.imageItem} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave.bind(this)} isOpen={this.state.videoEditorDialog} filePickerKey={this.props.filePickerKey} videoItem={this.state.videoItem} />
        <FileEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave.bind(this)} isOpen={this.state.fileEditorDialog} filePickerKey={this.props.filePickerKey} fileItem={this.state.fileItem} />
         <div className="post-editor">
          { postsetId ? <PostEditor id={postsetId} accountId={this.props.params.account_id} /> : null}
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getMediaItems: (accountId) => dispatch(fetchCollections(accountId)),
    fetchUrlData: (url) => dispatch(fetchUrlData(url)),
    clearUrlContent: () => dispatch(clearUrlContent()),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    searchWeb: (string) => dispatch(searchWeb(string)),
    getFeeds: (accountId) => dispatch(getFeeds(accountId)),
    getFeedItems: (feedId) => dispatch(getRSSItems(feedId)),
    createFeed: (data) => dispatch(createFeed(data)),
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    setSearchFilter: (searchFilter) => dispatch(setSearchFilter(searchFilter)),
    setSortOrder: (sortOrder) => dispatch(setSortOrder(sortOrder)),
    deleteMediaItem: (id) => dispatch(deleteMediaItem(id)),
    setProcessingItem: (processingItem) => dispatch(toggleProccessingItem(processingItem)),
    updateMediaItem: (mediaItem) => dispatch(updateMediaItem(mediaItem)),
    setActiveMediaItemId: (id) => dispatch(setActiveMediaItemId(id)),
    createPostSet: (postSet) => dispatch(createPostSetRequest(postSet)),
  };
}

const mapStateToProps = createStructuredSelector({
  urlContent: makeSelectUrlContent(),
  filePickerKey: makeSelectFilePickerKey(),
  activeCollection: makeSelectActiveCollection(),
  mediaItems: makeSelectMediaItems(),
  searchResults: makeSelectSearchResults(),
  feeds: makeSelectFeeds(),
  rssItems: makeSelectRSSItems(),
  filter: makeSelectFilter(),
  processingItem: makeSelectProcessingItem(),
  activeMediaItem: makeSelectActiveMediaItem(),
});

Library.propTypes = {
  getMediaItems: PropTypes.func,
  params: PropTypes.any,
  fetchUrlData: PropTypes.func,
};

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Library));
