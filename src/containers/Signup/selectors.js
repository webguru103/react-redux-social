import { createSelector } from 'reselect';

const selectSignup = (state) => state.get('signup');

const selectPlan = () => createSelector(
  selectSignup,
  (signup) => signup.get('plan')
);

export {
  selectSignup,
  selectPlan,
};
