import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import CenterText from 'elements/atm.CenterText';

import theme from 'theme';

import { get } from 'utils/localStorage';

class SignupVerification extends Component {
  constructor(props) {
    super(props);

    const userInfo = get('signup') || {};

    this.state = {
      name: userInfo.name,
      email: userInfo.email,
    };
  }

  render() {
    const { name, email } = this.state;

    return (
      <div style={{ marginTop: '150px' }}>
        <Title>Great Job {name}</Title>
        <CenterText style={{ marginTop: '40px' }}>Just one more thing! We have emailed an activation link to
          &nbsp;<span style={{ color: theme.primaryColor }}>{email}</span>. Please click on the link to activate your account and start creating content today.
        </CenterText>
        <Center style={{ marginTop: '40px' }}>Can't find your activation email?</Center>
        <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Resend Activation Email" primary /></Center>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerification);
