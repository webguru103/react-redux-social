import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { get } from 'utils/localStorage';

import { toastr } from 'lib/react-redux-toastr';

import {
  createPaymentSource,
  postSubscription,
  fetchCurrentPlan,
} from 'containers/App/actions';
import {
  selectCreatingPaymentSource,
  selectSubscription,
  selectCurrentPlan,
  selectCoupon,
} from 'containers/App/selectors';

import PaymentForm from 'components/PaymentForm';
import Loading from 'components/Loading';

import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';

import {
  selectPlan,
} from '../selectors';

class SignupCheckout extends Component {
  static propTypes = {
    plan: PropTypes.object,
    coupon: PropTypes.object,   // eslint-disable-line
    creatingPaymentSource: PropTypes.object,
    subscription: PropTypes.object,
    currentPlan: PropTypes.object,
    createPaymentSource: PropTypes.func,
    postSubscription: PropTypes.func,
    fetchCurrentPlan: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const userInfo = get('signup') || {};

    this.state = {
      name: userInfo.name,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.plan !== nextProps.plan) {
      const { details } = nextProps.plan;
      if (!details.requires_payment) {
        browserHistory.push('/');
      }
    } else if (this.props.creatingPaymentSource !== nextProps.creatingPaymentSource) {
      const { fetching, error } = nextProps.creatingPaymentSource;

      if (!fetching) {
        if (!error) {     // Create Source Succeeded
          let payload = {
            account_id: cookie.load('account_id'),
            plan_id: nextProps.location.query.plan_id,
          };
          if (nextProps.coupon.details && nextProps.coupon.details.id) {
            payload = {
              ...payload,
              coupon: nextProps.coupon.details.id,
            };
          }
          this.props.postSubscription(payload);
        } else {
          toastr.error(error.message);
          this.setState({
            loading: false,
          });
        }
      } else {
        this.setState({
          loading: true,
        });
      }
    } else if (this.props.subscription !== nextProps.subscription) {
      const { fetching, error } = nextProps.subscription;

      if (!fetching) {
        if (!error) {
          this.props.fetchCurrentPlan({
            accountId: cookie.load('account_id'),
            selectedPlan: nextProps.location.query.plan_id,
          });
        } else {
          toastr.error(error.message);
          this.setState({
            loading: false,
          });
        }
      }
    } else if (this.props.currentPlan !== nextProps.currentPlan) {
      const { fetching, error } = nextProps.currentPlan;

      if (!fetching) {
        if (!error) {
          browserHistory.push('/');
        } else {
          toastr.error(error.message);
          this.setState({
            loading: false,
          });
        }
      }
    }
  }

  handlePayment = (stripeToken) => {
    this.props.createPaymentSource({
      account_id: cookie.load('account_id'),
      stripe_token: stripeToken,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Title>Hi {this.state.name}</Title>
        <Center>Please provide your billing information below.</Center>
        <PaymentForm handlePayment={this.handlePayment} style={{ marginTop: '40px' }}>
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Thanks, now get started" primary /></Center>
        </PaymentForm>
        { loading && <Loading /> }
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createPaymentSource: (payload) => dispatch(createPaymentSource(payload)),
    postSubscription: (payload) => dispatch(postSubscription(payload)),
    fetchCurrentPlan: (payload) => dispatch(fetchCurrentPlan(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
  creatingPaymentSource: selectCreatingPaymentSource(),
  subscription: selectSubscription(),
  currentPlan: selectCurrentPlan(),
  coupon: selectCoupon(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupCheckout);
