/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('routing');
    if (typeof prevRoutingState === 'undefined' || !prevRoutingState.equals(routingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const selectLocation = (state, props) => props.location;

const makeSelectLocationName = createSelector(
    selectLocation,
    (location) => location.name
);

export {
    makeSelectLocationState,
    makeSelectLocationName,
};