import { createSelector } from 'reselect';
import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_IMAGES,
  SHOW_LINKS,
  SHOW_VIDEOS,
  SHOW_FILES,
} from './constants';

const selectLibrary = (state) => state.get('library');

const makeSelectActiveCollection = () => createSelector(
   selectLibrary,
    (library) => library.get('activeCollection')
);

const makeSelectUrlContent = () => createSelector(
  selectLibrary,
  (library) => library.get('urlContent')
);

const makeSelectMediaItems = () => createSelector(
  [selectLibrary],
  (library) => library.get('mediaItems')
);

const makeSelectProcessingItem = () => createSelector(
  [selectLibrary],
  (library) => library.get('processingItem')
);

const makeSelectSearchResults = () => createSelector(
  selectLibrary,
  (library) => library.get('searchResults')
);

const makeSelectFeeds = () => createSelector(
  selectLibrary,
  (library) => library.get('feeds')
);

const makeSelectRSSItems = () => createSelector(
  selectLibrary,
  (library) => library.get('rssItems')
);

const makeSelectFilter = () => createSelector(
  [selectLibrary],
  (library) => library.get('filter')
);

const makeSelectSearchFilter = () => createSelector(
  [selectLibrary],
  (library) => library.get('searchFilter')
);

const makeSelectSortOrder = () => createSelector(
  [selectLibrary],
  (library) => library.get('sort')
);

const makeSelectActiveMediaItemId = () => createSelector(
  [selectLibrary],
  (library) => library.get('activeMediaItemId')
);

const makeSelectActiveMediaItem = () => createSelector(
  [makeSelectActiveMediaItemId(), makeSelectMediaItems()],
  (id, mediaItems) => mediaItems.find(x => x.media_item_id === id)
);

const makeSelectVisibleMediaItems = () => createSelector(
  [makeSelectMediaItems(), makeSelectSortOrder(), makeSelectFilter()],
  (mediaItems, sortOrder, filter) => {
    let sortedItems = mediaItems;
    if (sortOrder === 'date') {
      sortedItems = mediaItems.sort((a, b) => b.creation_time - a.creation_time);
    } else if (sortOrder === 'title') {
      sortedItems = mediaItems.sort((a, b) => {
        if(a.properties.title && (b.properties.title || b.properties.filename)) {
          return a.properties.title.localeCompare(b.properties.title || b.properties.filename);
        } else if (a.properties.filename && (b.properties.title || b.properties.filename)) {
          return a.properties.filename.localeCompare(b.properties.title || b.properties.filename);
        }
      });
    } else {
      sortedItems = mediaItems;
    }

    switch (filter) {
      case SHOW_BLOGS:
        return sortedItems.filter(t => t.type === 'blog');
      case SHOW_IMAGES:
        return sortedItems.filter(t => t.type === 'image');
      case SHOW_LINKS:
        return sortedItems.filter(t => t.type === 'link');
      case SHOW_VIDEOS:
        return sortedItems.filter(t => t.type === 'video');
      case SHOW_FILES:
        return sortedItems.filter(t => t.type === 'document');
      case SHOW_ALL:
        return sortedItems;
      default:
        return sortedItems;
    }
});

const makeSelectVisibleMediaItemsWithSearch = () => createSelector(
  [makeSelectVisibleMediaItems(), makeSelectSearchFilter()],
  (mediaItems, searchFilter) => {
    if (searchFilter) {
      return mediaItems.filter(t => (t.properties.title && t.properties.title.indexOf(searchFilter) > -1) || (t.properties.filename && t.properties.filename.indexOf(searchFilter) > -1) || (t.properties.description && t.properties.description.indexOf(searchFilter) > -1) );
    } else {
      return mediaItems;
    }
});

const makeSelectPostSets = () => createSelector(
   selectLibrary,
    (library) => library.get('postSets')
);

const makeSelectPostSet = () => createSelector(
   selectLibrary,
    (library) => library.get('postSet')
);

const makeSelectEmailInvited = () => createSelector(
   selectLibrary,
    (library) => library.get('emailInvited')
);

export {
    makeSelectActiveCollection,
    makeSelectUrlContent,
    makeSelectMediaItems,
    makeSelectSearchResults,
    makeSelectFeeds,
    makeSelectRSSItems,
    makeSelectFilter,
    makeSelectSortOrder,
    makeSelectVisibleMediaItemsWithSearch,
    makeSelectProcessingItem,
    makeSelectActiveMediaItem,
    makeSelectPostSets,
    makeSelectPostSet,
    makeSelectEmailInvited,
};
