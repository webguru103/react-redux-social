import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.get('auth'),
  redirectAction: routerActions.push,
  predicate: (auth) => auth.get('loggedIn'),
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false,
});
