import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectActiveCollection = () => createSelector(
   selectLibrary,
    (library) => library.get('activeCollection')
);

export {
    makeSelectActiveCollection,
};
