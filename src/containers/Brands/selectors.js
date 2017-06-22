import { createSelector } from 'reselect';

const selectBrands = (state) => state.get('brands');

const makeSelectBrandCreated = () => createSelector(
  selectBrands,
  (brands) => brands.get('isBrandCreated')
);

const makeSelectBrandDeleted = () => createSelector(
  selectBrands,
  (brands) => brands.get('isBrandDeleted')
);

export {
  makeSelectBrandCreated,
  makeSelectBrandDeleted,
};
