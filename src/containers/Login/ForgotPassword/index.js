import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

import {
  forgotPassword,
} from './actions';
import {
  selectForgotPassword,
} from './selectors';

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        error: '',
      },
      error: '',
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.error) {
      this.props.forgotPassword(this.state.email.value);
    }
  }

  onFieldChange = (ev) => {
    const { name, value } = ev.target;
    let error;

    switch (name) {
      default:
        error = '';
    }

    this.setState({
      [name]: {
        value,
        error,
      },
      error,
    });
  }

  render() {
    return (
      <div>
        <Title>Forgot your password?</Title>
        <Center>We&#39;ll email you instructions on how to reset it.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
          <PPTextField
            type="email"
            name="email"
            hintText="example@name.example"
            floatingLabelText="Email"
            value={this.state.email.value}
            errorText={this.state.email.error}
            onChange={this.onFieldChange}
          />

          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Reset Password" primary disabled={!!this.state.error} /></Center>
          <Center style={{ marginTop: '30px' }}>Already have an account?&nbsp;<PPLink to="/login">Sign In</PPLink></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email)),
  };
}

const mapStateToProps = createStructuredSelector({
  forgotPasswordResult: selectForgotPassword,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
