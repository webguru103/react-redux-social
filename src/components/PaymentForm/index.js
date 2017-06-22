import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { range } from 'lodash';

import { toastr } from 'lib/react-redux-toastr';

import {
  applyCoupon,
} from 'containers/App/actions';
import {
  selectCoupon,
} from 'containers/App/selectors';

import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

const monthOptions = moment.months().map((month, index) => {
  let mm = index + 1;
  if (mm >= 10) {
    mm = `${mm}`;
  } else {
    mm = `0${mm}`;
  }

  return { value: (index + 1).toString(), label: `${mm} - ${month}` };
});

const yearOptions = range(2017, 2026).map((year) => ({
  value: year.toString(),
  label: year,
}));

class PaymentForm extends Component {
  static propTypes = {
    coupon: PropTypes.object,
    couponAllowed: PropTypes.bool,
    style: PropTypes.object,
    handlePayment: PropTypes.func,
    applyCoupon: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    couponAllowed: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      expirationYear: null,
      expirationMonth: null,
      nameOnCard: {
        value: '',
        error: '',
      },
      cardNumber: {
        value: '',
        error: '',
      },
      cvc: {
        value: '',
        error: '',
      },
      coupon: {
        value: '',
        error: '',
      },
      couponViewType: 0,
      hasError: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coupon !== nextProps.coupon) {
      const { details, error } = nextProps.coupon;
      if (details) {
        toastr.success('Success', 'Your coupon code has been applied!');
        this.setState({
          couponViewType: 2,
        });
      } else if (error) {
        toastr.error(error);
        this.setState({
          coupon: {
            value: this.state.coupon.value,
            error,
          },
        });
      }
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.hasError) {
      return;
    }

    Stripe.card.createToken({
      number: this.state.cardNumber.value,
      cvc: this.state.cvc.value,
      exp_month: this.state.expirationMonth.value,
      exp_year: this.state.expirationYear.value,
      name: this.state.nameOnCard.value,
    }, this.handleStripeResponse);
  }

  onMonthChange = (option) => {
    this.setState({ expirationMonth: option });
  }

  onYearChange = (option) => {
    this.setState({ expirationYear: option });
  }

  onFieldChange = (event) => {
    const { name, value } = event.target;
    let error;
    let hasError = false;

    switch (name) {
      case 'nameOnCard':
        if (value.trim() === '') {
          error = 'Please, enter Name on Card';
        }
        break;
      case 'cvc':
        if (value.trim() === '') {
          error = 'Enter CVC';
        }
        break;
      default:
        break;
    }

    if (!this.state.nameOnCard.value.trim() || !this.state.cvc.value.trim()) {
      hasError = true;
    }

    this.setState({
      [name]: {
        value,
        error,
      },
      hasError,
    });
  }

  getCouponView = () => {
    const { couponViewType } = this.state;
    switch (couponViewType) {
      case 0:
        return <Center style={{ marginTop: '30px' }}><PPLink onClick={this.showCouponView} >Add Coupon Code</PPLink></Center>;
      case 1:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PPTextField
                type="text"
                name="coupon"
                floatingLabelText="Coupon Code"
                value={this.state.coupon.value}
                errorText={this.state.coupon.error}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <PPButton label="Apply Coupon" primary style={{ marginTop: '30px', width: '100%' }} onClick={this.applyCoupon} />
              <div style={{ marginTop: '5px', width: '100%', padding: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={this.removeCoupon}>Cancel</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            style={{
              background: 'green',
              padding: '10px 20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            Your coupon code has been applied!
            <a
              style={{ color: 'white' }}
              onClick={this.removeCoupon}
            >
              Remove
            </a>
          </div>
        );
      default:
        return null;
    }
  }

  applyCoupon = () => {
    this.props.applyCoupon(this.state.coupon.value);
  }

  removeCoupon = (event) => {
    event.preventDefault();
    this.props.applyCoupon(null);
    this.setState({
      couponViewType: 0,
      coupon: {
        value: '',
      },
    });
  }

  showCouponView = () => {
    this.setState({
      couponViewType: 1,
    });
  }

  handleStripeResponse = (status, response) => {
    if (response.error) {
      alert(response.error.message);
    } else {
      this.props.handlePayment(response.id);
    }
  }

  render() {
    const { couponAllowed, children, style } = this.props;

    return (
      <form onSubmit={this.onFormSubmit} style={style}>
        <PPTextField
          type="text"
          name="nameOnCard"
          hintText="Example Name"
          floatingLabelText="Name On Card"
          value={this.state.nameOnCard.value}
          errorText={this.state.nameOnCard.error}
          onChange={this.onFieldChange}
        />
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <Dropdown label="Credit Card Expiration Date" value={this.state.expirationMonth} options={monthOptions} onChange={this.onMonthChange} />
          </div>
          <div className="col-sm-12 col-md-4">
            <Dropdown label="" value={this.state.expirationYear} options={yearOptions} onChange={this.onYearChange} />
          </div>
        </div>
        <div className="row" style={{ marginTop: '15px' }}>
          <div className="col-sm-12 col-md-9">
            <PPTextField
              type="text"
              name="cardNumber"
              hintText="0000-0000-0000-0000"
              floatingLabelText="Credit Card Number"
              value={this.state.cardNumber.value}
              errorText={this.state.cardNumber.error}
              onChange={this.onFieldChange}
            />
          </div>
          <div className="col-sm-12 col-md-3">
            <PPTextField
              type="text"
              name="cvc"
              floatingLabelText="CVC"
              value={this.state.cvc.value}
              errorText={this.state.cvc.error}
              onChange={this.onFieldChange}
            />
          </div>
        </div>
        { couponAllowed && this.getCouponView() }
        { children }
      </form>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    applyCoupon: (payload) => dispatch(applyCoupon(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  coupon: selectCoupon(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
