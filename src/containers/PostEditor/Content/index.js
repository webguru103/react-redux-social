import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { routerActions } from 'react-router-redux';
import filepicker from 'filepicker-js';
import * as linkify from 'linkifyjs';

import LinkEditor from 'containers/MediaItemLibrary/LinkEditor';
import FileEditor from 'containers/MediaItemLibrary/FileEditor';
import VideoEditor from 'containers/MediaItemLibrary/VideoEditor';
import LinkDialog from 'containers/MediaItemLibrary/LinkDialog';
import ImageEditor from 'containers/MediaItemLibrary/ImageEditor';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectUser,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  postCommentRequest,
  deleteCommentRequest,
  createMediaItem,
  updateMediaItem,
  removeMediaItem,
  setMediaItem,
  fetchUrlData,
  clearUrlContent,
  fetchCollections,
} from 'containers/PostEditor/actions';

import {
  makeSelectComments,
  makeSelectVisibleMediaItems,
  makeSelectInProgress,
  makeSelectUrlContent,
  makeSelectIsProcessing,
  makeSelectFilter,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import MessageEditor from '../MessageEditor';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';
import MediaLibraryDialog from '../MediaLibraryDialog';

class Content extends Component {

  static propTypes = {
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    comments: ImmutablePropTypes.list,
    user: PropTypes.shape(),
    pending: PropTypes.bool,
    postSet: PropTypes.object,
    accountId: PropTypes.number,
    filePickerKey: PropTypes.string,
    isProcessing: PropTypes.bool,
    pushToLibrary: PropTypes.func,
    id: PropTypes.string,
    urlContent: PropTypes.string,
    filter: PropTypes.string,
    mediaItems: PropTypes.array,
    updatePostSet: PropTypes.func,
    fetchCollections: PropTypes.func,
    clearUrlContent: PropTypes.func,
    createMediaItem: PropTypes.func,
    updateMediaItem: PropTypes.func,
    fetchUrlData: PropTypes.func,
    removeMediaItem: PropTypes.func,
    setMediaItem: PropTypes.func,
  };

  static defaultProps = {
    params: {},
  };

  constructor(props) {
    super(props);
    const globalMessage = !props.postSet.get('details').isEmpty() ? props.postSet.getIn(['details', 'message']) : '';
    const characterLimit = this.calculateCharacterLimit(globalMessage, {}, false);
    this.state = {
      globalMessage,
      characterLimit,
      fileEditor: false,
      hasWordPressPost: false,
      imageEditor: false,
      videoEditor: false,
      linkEditor: false,
      linkDialog: false,
      mediaItem: {},
      item: {},
      urls: [],
    };
  }

  componentDidMount() {
    this.props.fetchCollections(this.props.accountId);
    const { globalMessage } = this.state;
    this.linkifyMessage(globalMessage);
  }

  componentWillReceiveProps(nextProps) {
    const { postSet, urlContent } = nextProps;
    const { messageUrls, globalMessage } = this.state;

    if (urlContent !== this.props.urlContent) {
      for (let i = 0; i < messageUrls.length; i += 1) {
        const url = messageUrls[i];
        if (urlContent.original_url === url.href) {
          const newMessage = globalMessage.replace(url.value, urlContent.short_url);
          this.setState({ globalMessage: newMessage });
          this.handleMessageChange(newMessage);
          this.handleMessageBlur(newMessage);
          return;
        }
      }
    }

    const newMessage = postSet.getIn(['details', 'message']);
    let newMediaItem = postSet.getIn(['details', 'media_items']) || fromJS([]);

    newMediaItem = newMediaItem.toJS();
    if (this.props.postSet.get('details').isEmpty() || this.props.postSet.getIn(['details', 'post_set_id']) !== postSet.getIn(['details', 'post_set_id'])) {
      this.setState({ globalMessage: newMessage || '' });
      this.linkifyMessage(newMessage);
    }
    if (newMediaItem[0]) {
      this.setState({
        item: newMediaItem[0],
      });
    }
    if (newMediaItem.length === 0 && this.state.item.media_item_id) {
      this.setState({ item: {} });
    }

    const hasWordPressPost = postSet.getIn(['details', 'posts']).some((post) => {
      if (post.get('status') === '0') return false;
      if (post.get('connection_channel') === 'wordpress') return true;
      return false;
    });

    this.setState({
      characterLimit: this.calculateCharacterLimit(newMessage, newMediaItem[0], hasWordPressPost),
      hasWordPressPost,
    });
  }

  calculateCharacterLimit = (globalMessage = this.state.globalMessage, item = this.state.item, hasWordPressPost = this.state.hasWordPressPost) => {
    let mediaLength = (item && Object.keys(item).length > 0) ? 24 : 0;
    if (hasWordPressPost) mediaLength += 24;
    return 140 - (globalMessage ? globalMessage.length : 0) - mediaLength;
  }

  handleMessageChange = (value) => {
    const globalMessage = value;
    const characterLimit = this.calculateCharacterLimit(globalMessage);
    this.setState({ globalMessage, characterLimit });
    this.linkifyMessage(globalMessage);
  }

  linkifyMessage = (message) => {
    const links = linkify.find(message);
    let urls = [];
    if (links && links.length) {
      urls = links.filter((link) =>
        link.type === 'url' && link.href.indexOf('upo.st') === -1);
    }
    this.setState({ messageUrls: urls });
  }

  handleMessageBlur = (message = this.state.globalMessage) => {
    const { updatePostSet, postSet } = this.props;
    updatePostSet({
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
      message,
    });
  }

  openLinkEditor = (linkItem) => {
    if (linkItem) {
      this.setState({ linkEditor: true, mediaItem: linkItem });
    } else {
      this.setState({ linkEditor: true });
    }
  }

  openFileEditor = (fileItem) => {
    this.setState({ fileEditor: true, mediaItem: fileItem });
  }

  openMediaLibrary = () => {
    this.setState({ mediaLibrary: true });
  }

  openImageEditor = (imageItem) => {
    this.setState({ imageEditor: true, mediaItem: imageItem });
  }

  openVideoEditor = (videoItem) => {
    this.setState({ videoEditor: true, mediaItem: videoItem });
  }

  openLinkDialog = () => {
    this.setState({ linkDialog: true });
  }

  closeAllDialog = () => {
    this.setState({
      linkDialog: false,
      linkEditor: false,
      videoEditor: false,
      imageEditor: false,
      fileEditor: false,
      mediaLibrary: false,
      mediaItem: {},
      addLinkValue: '',
    });
    this.props.clearUrlContent();
  }

  handleLinkEditorSave = (item) => {
    const { filePickerKey } = this.props;
    this.closeAllDialog();
    const { action, ...linkItem } = item;
    filepicker.setKey(filePickerKey);
    if (linkItem.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${linkItem.picture}`, (Blob) => {
        // console.log(Blob);
        linkItem.picture = Blob.url;
        linkItem.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${linkItem.picture}`,
          (blob) => {
            linkItem.thumb_key = blob.key;
            linkItem.account_id = this.props.accountId;
            // console.log(linkItem);
            linkItem.mediaItemType = 'link';
            if (action === 'create') {
              this.props.createMediaItem(linkItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(linkItem);
            }
          });
      });
    } else {
      linkItem.mediaItemType = 'link';
      linkItem.account_id = this.props.accountId;
      if (action === 'create') {
        this.props.createMediaItem(linkItem);
      } else if (action === 'update') {
        this.props.updateMediaItem(linkItem);
      }
    }
    setTimeout(() => this.handleMessageBlur(), 5000);
  }

  openFilePicker = () => {
    const { filePickerKey } = this.props;
    filepicker.setKey(filePickerKey);

    const filePickerOptions = {
      buttonText: 'Upload',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };
    const filePickerStoreOptions = {
      location: 'S3',
    };
    function onFail(error) {
      console.log('error: ', error);
    }

    filepicker.pickAndStore(filePickerOptions, filePickerStoreOptions, this.handleOpenFilePicker, onFail);
  }

  handleVideoEditorSave(videoItem) {
    this.setState({ videoEditor: false, mediaItem: {} });
    const { action, ...item } = videoItem;
    const { filePickerKey } = this.props;
    filepicker.setKey(filePickerKey);
    if (item.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${item.picture}`, (Blob) => {
        // console.log(Blob);
        item.picture = Blob.url;
        item.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${item.picture}`,
          (blob) => {
            item.thumb_key = blob.key;
            item.account_id = this.props.accountId;
            item.mediaItemType = 'link';
            if (action === 'create') {
              this.props.createMediaItem(item);
            } else if (action === 'update') {
              this.props.updateMediaItem(item);
            }
          });
      });
    } else if (action === 'update') {
      this.props.updateMediaItem(item);
    } else if (action === 'create') {
      this.props.createMediaItem(item);
    }
    setTimeout(() => this.handleMessageBlur(), 3000);
  }

  handleOpenFilePicker = (mediaItem) => {
    const { filePickerKey, accountId } = this.props;
    filepicker.setKey(filePickerKey);

    if (mediaItem[0].mimetype.match('image')) {
      filepicker.storeUrl(
        `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${mediaItem[0].url}`,
        (blob) => {
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
              thumb_key: blob.key,
              account_id: accountId,
            },
          };
          // console.log(mediaItem);
          this.openImageEditor(imageItem);
        });
    } else if (mediaItem[0].mimetype.match('video')) {
      const videoItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          account_id: accountId,
        },
      };
      // console.log(mediaItem);
      this.openVideoEditor(videoItem);
    } else {
      // console.log(mediaItem);
      const fileItem = {
        mediaItemType: 'file',
        properties: {
          ...mediaItem[0],
          account_id: accountId,
        },
      };
      this.openFileEditor(fileItem);
    }
  }

  handleFileEditorSave(item) {
    this.setState({ fileEditor: false, mediaItem: {} });
    const { action, ...fileItem } = item;
    const { filePickerKey, accountId } = this.props;
    filepicker.setKey(filePickerKey);
    if (fileItem.picture) {
      filepicker.storeUrl(`https://process.filestackapi.com/${filePickerKey}/${fileItem.picture}`, (Blob) => {
        // console.log(Blob);
        fileItem.picture = Blob.url;
        fileItem.picture_key = Blob.key;
        filepicker.storeUrl(
          `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${fileItem.picture}`,
          (blob) => {
            fileItem.thumb_key = blob.key;
            fileItem.account_id = accountId;
            fileItem.mediaItemType = 'link';
            if (action === 'create') {
              this.props.createMediaItem(fileItem);
            } else if (action === 'update') {
              this.props.updateMediaItem(fileItem);
            }
          });
      });
    } else if (action === 'update') {
      this.props.updateMediaItem(fileItem);
    } else if (action === 'create') {
      this.props.createMediaItem(fileItem);
    }
    setTimeout(() => this.handleMessageBlur(), 3000);
  }

  handleAddLinkValue(event) {
    this.setState({ addLinkValue: event.target.value });
  }

  handleAddLinkValueFromDialog(link) {
    this.setState({ addLinkValue: link }, () => this.handleAddLinkSubmit());
  }

  handleAddLinkSubmit = () => {
    // console.log('in handle add link submit');
    if (this.state.addLinkValue === '') {
      // console.log('no link value, abort');
      this.setState({ addLinkValueError: 'A link URL is required' });
      return;
    }

    /* const linkItem = {
      source: this.state.addLinkValue,
    }; */

    this.setState({ addLinkValue: '', linkDialog: false, linkEditor: true });

    this.props.fetchUrlData(this.state.addLinkValue);
  }

  handleImageEditorSave = (imageItem) => {
    this.setState({ imageEditor: false, mediaItem: {} });
    const { action, ...rest } = imageItem;
    if (action === 'update') {
      this.props.updateMediaItem(rest);
    } else if (action === 'create') {
      this.props.createMediaItem(rest);
    }
    setTimeout(() => this.handleMessageBlur(), 3000);
  }

  removeItem = () => {
    this.props.removeMediaItem();
    setTimeout(() => this.handleMessageBlur(), 1500);
  }

  openEditor = (mediaItem) => {
    if (mediaItem.type === 'image') {
      this.openImageEditor(mediaItem);
    } else if (mediaItem.type === 'link') {
      this.openLinkEditor(mediaItem);
    } else if (mediaItem.type === 'video') {
      this.openVideoEditor(mediaItem);
    } else if (mediaItem.type === 'document') {
      this.openFileEditor(mediaItem);
    }
  }

  addToPost = (mediaItem) => {
    this.props.setMediaItem(mediaItem);
    this.closeAllDialog();

    setTimeout(() => this.handleMessageBlur(), 3000);
  }

  shortenUrl = () => {
    const { messageUrls } = this.state;
    messageUrls.forEach((url) => {
      this.props.fetchUrlData(url.value);
    });
  }

  render() {
    const { postComment, deleteComment, comments, user, pending, pushToLibrary, id, accountId } = this.props;
    const { globalMessage, characterLimit, item, messageUrls } = this.state;
    // const { params: { postset_id, account_id } } = this.props;
    const actions = [
      { label: 'close', onClick: this.closeAllDialog },
    ];

    return (
      <Wrapper pending={pending}>
        <MessageEditor
          message={globalMessage}
          mediaItem={item}
          removeMediaItem={this.removeItem}
          characterLimit={characterLimit}
          handleMessageChange={this.handleMessageChange}
          handleMessageBlur={this.handleMessageBlur}
          openFilePicker={this.openFilePicker}
          openEditor={this.openEditor}
          pushToLibrary={pushToLibrary}
          accountId={accountId}
          postSetId={id}
          openLinkDialog={this.openLinkDialog}
          openMediaLibrary={this.openMediaLibrary}
          isProcessing={this.props.isProcessing}
          urls={messageUrls}
          shortenUrl={this.shortenUrl}
        />
        <Comments />
        <div className="comment-input">
          <CommentInput user={user} postComment={(text) => postComment(id, text)} />
        </div>
        {
          comments.map((comment) =>
            <Comment
              key={comment.get('comment_id')}
              comment={comment}
              removable={user.user_id === comment.getIn(['user', 'user_id'])}
              remove={deleteComment}
            />
          )
        }
        <LinkEditor actions={actions} closeAllDialog={this.closeAllDialog} handleLinkEditorSave={this.handleLinkEditorSave} linkEditorDialog={this.state.linkEditor} urlContent={this.props.urlContent} filePickerKey={this.props.filePickerKey} linkItem={this.state.mediaItem} />
        <ImageEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleImageEditorSave} isOpen={this.state.imageEditor} filePickerKey={this.props.filePickerKey} imageItem={this.state.mediaItem} />
        <LinkDialog actions={actions} closeAllDialog={this.closeAllDialog} linkDialog={this.state.linkDialog} handleAddLinkValue={this.handleAddLinkValue.bind(this)} handleSubmit={this.handleAddLinkSubmit} value={this.state.addLinkValue} errorText={this.state.addLinkValueError} />
        <VideoEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleVideoEditorSave.bind(this)} isOpen={this.state.videoEditor} filePickerKey={this.props.filePickerKey} videoItem={this.state.mediaItem} />
        <FileEditor actions={actions} closeAllDialog={this.closeAllDialog} handleSave={this.handleFileEditorSave.bind(this)} isOpen={this.state.fileEditor} filePickerKey={this.props.filePickerKey} fileItem={this.state.mediaItem} />
        <MediaLibraryDialog actions={actions} filter={this.props.filter} closeAllDialog={this.closeAllDialog} isOpen={this.state.mediaLibrary} mediaItems={this.props.mediaItems} addToPost={this.addToPost} />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    updateMediaItem: (mediaItem) => dispatch(updateMediaItem(mediaItem)),
    removeMediaItem: () => dispatch(removeMediaItem()),
    pushToLibrary: (redirectUrl, accountId) => dispatch(routerActions.push({ pathname: `/account/${accountId}/library`, query: { postSet: redirectUrl } })),
    setMediaItem: (mediaItem) => dispatch(setMediaItem(mediaItem)),
    fetchUrlData: (url) => dispatch(fetchUrlData(url)),
    clearUrlContent: () => dispatch(clearUrlContent()),
    fetchCollections: (accountId) => dispatch(fetchCollections(accountId)),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
  filePickerKey: makeSelectFilePickerKey(),
  urlContent: makeSelectUrlContent(),
  mediaItems: makeSelectVisibleMediaItems(),
  isProcessing: makeSelectIsProcessing(),
  filter: makeSelectFilter(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
