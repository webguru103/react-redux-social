import { createSelector } from 'reselect';

const selectPublicPageSelector = (state) => state.get('publicPage');

const selectPostSet = () => createSelector(
  selectPublicPageSelector,
  (publicPage) => publicPage.get('postSet'),
);

export {
  selectPostSet,
};
