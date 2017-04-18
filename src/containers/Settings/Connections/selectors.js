import { createSelector } from 'reselect';

const selectConnections = (state) => state.get('connections');

const makeSelectChannelFilter = () => createSelector(
    selectConnections,
    (connections) => connections.get('channelFilter')
);

const makeSelectChannelType = () => createSelector(
    selectConnections,
    (connections) => connections.get('channelType')
);

const makeSelectConnections = () => createSelector(
    selectConnections,
    (connections) => connections.get('connections')
);

const makeSelectDialogShown = () => createSelector(
    selectConnections,
    (connections) => connections.get('dialogShown')
);

const makeSelectSocialUrls = () => createSelector(
    selectConnections,
    (connections) => connections.get('socialUrls')
);

const makeSelectSubCallback = () => createSelector(
    selectConnections,
    (connections) => connections.get('subCallback')
);

const makeSelectSubChannel = () => createSelector(
    selectConnections,
    (connections) => connections.get('subChannel')
);

const makeSelectSubChannels = () => createSelector(
    selectConnections,
    (connections) => connections.get('subChannels')
);

export {
    makeSelectChannelFilter,
    makeSelectChannelType,
    makeSelectConnections,
    makeSelectDialogShown,
    makeSelectSocialUrls,
    makeSelectSubCallback,
    makeSelectSubChannel,
    makeSelectSubChannels,
};
