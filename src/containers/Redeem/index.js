import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { get } from 'lodash';

import {
  setAuthState,
  setUser,
} from 'containers/App/actions';

import {
  redeemToken,
} from './actions';
import {
  selectRedeem,
} from './selectors';

import Wrapper from './Wrapper';

class Redeem extends Component {
  static propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
    redeem: PropTypes.object,
    redeemToken: PropTypes.func,
  }

  componentWillMount() {
    const { redeemToken, params } = this.props;
    redeemToken(params.token);
  }

  componentWillReceiveProps(nextProps) {
    const { redeem, redeemToken } = nextProps;

    if (this.props.redeem !== redeem) {
      const error = redeem.get('error');
      if (error) {
        if (error.code === '700') {
          browserHistory.push('/login');
        }
      } else {
        const detail = redeem.get('detail');
        const procedure = get(detail, 'token_procedure');
        const token = get(detail, 'token');
        const email = get(detail, 'email');
        const secondaryToken = get(detail, 'secondary_token');

        if (detail.api_key && procedure !== 'password_reset') {
          cookie.save('token', detail.api_key, { path: '/' });
        }

        if (secondaryToken) {
          if (detail.api_key) {
            redeemToken(secondaryToken);
          } else {
            console.error('No api key for secondary token');
            browserHistory.push('/');
          }
          return;
        }

        switch (procedure) {
          case 'login':
            browserHistory.push(`/login?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
            break;
          case 'signup':
            browserHistory.push(`/signup/account?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
            break;
          case 'reload_roles':
            location.href = '/';
            // browserHistory.push('/');
            break;
          case 'password_reset':
            cookie.save('user', detail.user);
            browserHistory.push(`/login/reset-password?api_key=${encodeURIComponent(detail.api_key)}`);
            break;
          case 'stream_invite': {
            const accountId = get(detail, 'account_id');
            const streamId = get(detail, 'stream.stream_id');
            browserHistory.push(`/account/${accountId}/library/shared_streams/subscriptions/${streamId}`);
            break;
          }
          default: { // activation
            const selectedPlan = get(detail, 'user_own_account.properties.selected_plan');
            const accountTypeId = get(detail, 'user_own_account.account_type_id');

            nextProps.setAuthState(true);
            nextProps.setUser({
              user: detail.user,
              user_own_account: detail.user_own_account,
              shared_accounts: detail.shared_accounts,
              subaccounts: detail.subaccounts || [],
            });

            cookie.save('account_id', detail.user_own_account.account_id, { path: '/' });

            if (accountTypeId === '5' && selectedPlan) {
              browserHistory.push(`/signup/checkout?plan_id=${selectedPlan}`);
            } else {
              browserHistory.push('/');
            }
            break;
          }
        }
      }
    }
  }

  getContent = () => {
    const { location: { query } } = this.props;

    switch (query.type) {
      case 'new_user':
        return 'We\'re activating your account';
      case 'password_reset':
        return 'We are looking up your account!';
      default:
        return 'Redeeming!';
    }
  }

  render() {
    const { redeem } = this.props;
    const error = redeem.get('error');

    return (
      error ?
        <Wrapper>
          { error.message }
        </Wrapper>
        :
        <Wrapper>
          { this.getContent() }
        </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  redeem: selectRedeem,
});

export const mapDispatchToProps = (dispatch) => ({
  redeemToken: (token) => dispatch(redeemToken(token)),
  setAuthState: (authState) => dispatch(setAuthState(authState)),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redeem);
