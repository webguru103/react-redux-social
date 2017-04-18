import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError, selectAuth } from 'containers/App/selectors';

import moment from 'moment';
import { range } from 'lodash';

import PPDropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

const monthOptions = moment.months().map((month, index) => {
  let mm = index + 1;
  if (mm >= 10) {
    mm = `${mm}`;
  } else {
    mm = `0${mm}`;
  }

  return { value: index + 1, label: `${mm} - ${month}` };
});
const yearOptions = range(2018, 2033).map((year) => ({
  value: year,
  label: year,
}));

class SignupCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expirationYear: 2018,
      expirationMonth: 1,
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
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.validPassword) {
      this.props.register(this.state.nameValue, this.state.emailValue, this.state.passwordValue);
    } else {
      this.setState({ errorText: 'Passwords do not match' });
    }
  }

  onMonthChange = (value) => {
    this.setState({ expirationMonth: value });
  }

  onYearChange = (value) => {
    this.setState({ expirationYear: value });
  }

  onFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <Title>Hi Name</Title>
        <Center>Please provide your billing information below.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
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
              <PPDropdown value={ this.state.expirationMonth } options={monthOptions} onChange={ this.onMonthChange } />
            </div>
            <div className="col-sm-12 col-md-4">
              <PPDropdown value={ this.state.expirationYear } options={yearOptions} onChange={ this.onYearChange } />
            </div>
          </div>
          <div className="row">
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
                hintText="Optional"
                floatingLabelText="CVC"
                value={this.state.cvc.value}
                errorText={this.state.cvc.error}
                onChange={this.onFieldChange}
              />
            </div>
          </div>
          <Center style={{ marginTop: '30px' }}><PPLink to="/coupon">Add Coupon Code</PPLink></Center>
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Thanks, now get started" primary /></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    register: (name, email, password) => dispatch(registerRequest({ name, email, password })),
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupCheckout);
