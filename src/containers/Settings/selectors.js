import { createSelector } from 'reselect';

const selectSettings = (state) => state.get('settings');

const selectSubscriptions = () => createSelector(
  selectSettings,
  (settings) => settings.get('subscriptions')
);

const selectCancellingSubscription = () => createSelector(
  selectSettings,
  (settings) => settings.get('cancellingSubscription')
);

export {
  selectSettings,
  selectSubscriptions,
  selectCancellingSubscription,
};
