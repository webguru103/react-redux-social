import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import CenterText from 'elements/atm.CenterText';

import theme from 'theme';

import { get } from 'utils/localStorage';

import { resendActivationEmail } from '../actions';

class SignupVerification extends Component {
  static propTypes = {
    location: PropTypes.object,
    resendActivationEmail: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const userInfo = get('signup') || {};

    this.state = {
      name: userInfo.name,
      email: userInfo.email,
    };
  }

  resendActivationEmail = () => {
    const { location: { query } } = this.props;
    this.props.resendActivationEmail({
      email: this.state.email,
      token: query.token,
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <div style={{ marginTop: '150px' }}>
        <Title>Great Job {name}</Title>
        <CenterText style={{ marginTop: '40px' }}>We have emailed an activation link to
          &nbsp;<span style={{ color: theme.primaryColor }}>{email}</span>. Please click on the link to activate your account.
        </CenterText>
        <Center style={{ marginTop: '40px' }}>Can't find your activation email?</Center>
        <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Resend Activation Email" primary onClick={this.resendActivationEmail} /></Center>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    resendActivationEmail: (payload) => dispatch(resendActivationEmail(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerification);
