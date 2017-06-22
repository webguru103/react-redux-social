import { createSelector } from 'reselect';
import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_IMAGES,
  SHOW_LINKS,
  SHOW_VIDEOS,
  SHOW_FILES,
} from './constants';
const selectPostSetEditor = (state) => state.get('postEditor');

const makeSelectComments = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('comments'),
);

const makeSelectFilter = () => createSelector(
  [selectPostSetEditor],
  (postSetEditor) => postSetEditor.get('filter')
);

const makeSelectInProgress = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('pending'),
);

const makeSelectIsProcessing = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('isProcessing')
);

const makeSelectUrlContent = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('urlContent')
);

const selectPostSet = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('postSet')
);

const makeSelectActiveCollection = () => createSelector(
   selectPostSetEditor,
    (postSetEditor) => postSetEditor.get('activeCollection')
);

const makeSelectAccountTags = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('accountTags'),
);

const makeSelectMediaItem = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.getIn(['postSet', 'details', 'media_items']),
);

const makeSelectMediaItems = () => createSelector(
  [selectPostSetEditor],
  (postSetEditor) => postSetEditor.get('mediaItems')
);

const makeSelectVisibleMediaItems = () => createSelector(
  [makeSelectMediaItems(), makeSelectFilter()],
  (mediaItems, filter) => {
    switch (filter) {
      case SHOW_ALL:
        return mediaItems;
      case SHOW_BLOGS:
        return mediaItems.filter((t) => t.type === 'blog');
      case SHOW_IMAGES:
        return mediaItems.filter((t) => t.type === 'image');
      case SHOW_LINKS:
        return mediaItems.filter((t) => t.type === 'link');
      case SHOW_VIDEOS:
        return mediaItems.filter((t) => t.type === 'video');
      case SHOW_FILES:
        return mediaItems.filter((t) => t.type === 'document');
      default:
        return mediaItems;
    }
  });

const selectWordpressGUI = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('wordpressGUI'),
);

const selectPost = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('post'),
);

const selectNewMediaItem = () => createSelector(
  selectPostSetEditor,
  (postSetEditor) => postSetEditor.get('newMediaItem'),
);

export {
  makeSelectComments,
  makeSelectAccountTags,
  makeSelectInProgress,
  makeSelectActiveCollection,
  selectPostSet,
  makeSelectUrlContent,
  makeSelectMediaItem,
  makeSelectMediaItems,
  makeSelectIsProcessing,
  makeSelectFilter,
  makeSelectVisibleMediaItems,
  selectWordpressGUI,
  selectPost,
  selectNewMediaItem,
};
