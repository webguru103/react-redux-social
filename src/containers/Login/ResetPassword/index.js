import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cookie from 'react-cookie';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';

import {
  resetPassword,
} from './actions';
import {
  selectResetPassword,
} from './selectors';

const initialState = {
  password: '',
  confirmPassword: '',
  dirty: false,
  error: 'Please enter password details',
};
class ResetPassword extends Component {
  static propTypes = {
    location: PropTypes.object,
    resetPassword: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.error) {
      const { location: { query } } = this.props;
      const user = cookie.load('user');

      this.props.resetPassword({
        ...user,
        password: this.state.password.value,
        apiKey: query.api_key,
      });
      this.setState(initialState);
    } else {
      this.setState({
        dirty: true,
      });
    }
  }

  onPasswordChange = (ev) => {
    const { value } = ev.target;
    let error;

    if (value.trim() === '') {
      error = 'Please enter password details';
    }
    if (value !== this.state.confirmPassword) {
      error = 'Password does not match';
    }
    this.setState({
      password: value,
      error,
      dirty: true,
    });
  }

  onConfirmPasswordChange = (ev) => {
    const { value } = ev.target;
    let error;

    if (value.trim() === '') {
      error = 'Please enter password details';
    }
    if (value !== this.state.password) {
      error = 'Password does not match';
    }
    this.setState({
      confirmPassword: value,
      error,
      dirty: true,
    });
  }

  render() {
    return (
      <div>
        <Title>Please enter a new password</Title>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '70px' }}>
          <PPTextField
            type="password"
            name="password"
            hintText="Password"
            floatingLabelText="New Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <PPTextField
            type="password"
            name="confirmPassword"
            hintText="Re-enter Password"
            floatingLabelText="Confirm New Password"
            value={this.state.confirmPassword}
            errorText={this.state.dirty && this.state.error}
            onChange={this.onConfirmPasswordChange}
          />

          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Reset Password" primary disabled={!!this.state.error} /></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (payload) => dispatch(resetPassword(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  resetPasswordResult: selectResetPassword,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
