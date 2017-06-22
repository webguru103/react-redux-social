import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError } from 'containers/App/selectors';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

class SignupAccount extends Component {
  static propTypes = {
    location: PropTypes.object,
    authError: PropTypes.string,
    register: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { location: { query } } = props;
    this.state = {
      name: {
        value: '',
        error: 'error',
        dirty: false,
      },
      email: {
        value: query.email || '',
        error: 'error',
        dirty: false,
      },
      phone: {
        value: '',
        error: '',
        dirty: false,
      },
      password: {
        value: '',
        error: '',
        dirty: false,
      },
      confirmPassword: {
        value: '',
        error: 'error',
        dirty: false,
      },
      hasError: true,
      credentialError: 'Please enter password details',
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { location: { query } } = this.props;

    if (!this.state.error) {
      this.props.register(this.state.name.value, this.state.email.value, this.state.password.value, query.token, {
        phone_number: this.state.phone.value,
        selected_plan: this.props.location.query.plan_id,
      });
    }
  }

  onFieldChange = (ev) => {
    const { name, value } = ev.target;
    let error;
    let hasError = false;
    let { credentialError } = this.state;
    let nameError = this.state.name.error;

    switch (name) {
      case 'name':
        if (value.trim().length < 2 || value.trim().length > 100) {
          error = 'Name field should have a min char of 2 and max char of 100';
          nameError = true;
        }
        if (value.trim() === '') {
          error = 'Name field should not be blank';
          nameError = true;
        }
        break;
      case 'password':
        if (value !== this.state.confirmPassword.value) {
          credentialError = 'Password does not match';
        } else if (value.trim() === '') {
          credentialError = 'Please enter password details';
        } else {
          credentialError = null;
        }
        break;
      case 'confirmPassword':
        if (value !== this.state.password.value) {
          credentialError = 'Password does not match';
        } else if (value.trim() === '') {
          credentialError = 'Please enter password details';
        } else {
          credentialError = null;
        }
        break;
      default:
        error = '';
    }

    if (nameError || credentialError) {
      hasError = true;
    }

    this.setState({
      [name]: {
        value,
        error,
        dirty: true,
      },
      credentialError,
      hasError,
    });
  }

  render() {
    const { location: { query } } = this.props;

    return (
      <div>
        <Title>Become a Power Publisher</Title>
        <Center>Create more content. Reach more people. Generate more leads.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
          <PPTextField
            type="text"
            name="name"
            hintText="Example Name"
            floatingLabelText="Name"
            value={this.state.name.value}
            errorText={this.state.name.dirty && this.state.name.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="email"
            name="email"
            hintText="example@name.example"
            floatingLabelText="Email"
            value={this.state.email.value}
            errorText={this.state.email.dirty && this.state.email.error}
            onChange={this.onFieldChange}
            disabled={!!query.email}
          />
          <PPTextField
            type="text"
            name="phone"
            hintText="Optional"
            floatingLabelText="Phone Number"
            rightLabelText="Optional"
            value={this.state.phone.value}
            errorText={this.state.phone.dirty && this.state.phone.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="password"
            hintText="6+ Characters"
            floatingLabelText="Password"
            value={this.state.password.value}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="confirmPassword"
            hintText="6+ Characters"
            floatingLabelText="Confirm Password"
            value={this.state.confirmPassword.value}
            errorText={(this.state.password.dirty || this.state.confirmPassword.dirty) && this.state.credentialError}
            onChange={this.onFieldChange}
          />
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Sign Up" primary disabled={this.state.hasError} /></Center>
          <Center style={{ marginTop: '30px' }}>By clicking Sign Up, I accept PowerPost's&nbsp;<PPLink to="/terms">Licence Terms</PPLink></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    register: (name, email, password, token, properties) => dispatch(registerRequest({ name, email, password, token, properties })),
  };
}

const mapStateToProps = createStructuredSelector({
  authError: makeSelectAuthError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
