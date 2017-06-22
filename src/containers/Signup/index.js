/* eslint-disable camelcase, no-shadow, radix */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import {
  selectCoupon,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import Topbar from './Topbar';

import {
  fetchPlan,
} from './actions';
import {
  selectPlan,
} from './selectors';

class Signup extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    plan: PropTypes.object,
    coupon: PropTypes.object,
    fetchPlan: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      amountOff: null,
      percentOff: null,
    };
  }

  componentWillMount() {
    const { fetchPlan, location: { query } } = this.props;

    if (query.plan_id) {
      fetchPlan(query.plan_id);
    }
  }

  discount = (amountOff, percentOff) => {
    this.setState({
      amountOff,
      percentOff,
    });
  }

  render() {
    const { children, plan, coupon } = this.props;
    const { amount_off, percent_off } = coupon.details || {};

    const {
      title,
      price,
      term_length,
      features = [],
    } = plan.details || {};
    let newPrice = price;

    if (amount_off) {
      newPrice -= amount_off / 100;
    } else if (percent_off) {
      newPrice *= (100 - percent_off) / 100;
    }

    Stripe.setPublishableKey('pk_test_X9sZwXwoYLj4fFnWCvXWntmO');   // TEST KEY
    // Stripe.setPublishableKey('pk_live_qElipTZ1MpTIsPNjdn3IxCCN');   // LIVE KEY

    return (
      <Wrapper>
        <LeftPane>
          <img src={imgLogo} alt="Logo" />
          <div style={{ marginTop: '120px', fontSize: '2rem' }}>PowerPost Business Plan</div>
          <div style={{ marginTop: '10px', fontSize: '4.5rem' }}>{title}</div>
          <div style={{ marginTop: '15px', fontSize: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>${parseInt(newPrice)}</span>&nbsp;
            <span>{term_length}</span>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>Not the plan you want, we've got you covered.&nbsp;
            <Link to="https://www.powerpost.digital/pricing" target="_blank" style={{ color: 'white', textDecoration: 'underline' }}>View Plans</Link>
          </div>
        </LeftPane>
        <RightPane>
          <Topbar />
          <FormWrapper>
            { children }
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
  coupon: selectCoupon(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPlan: (planId) => dispatch(fetchPlan(planId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
