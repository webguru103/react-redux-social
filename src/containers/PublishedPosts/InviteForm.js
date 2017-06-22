import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PPButton from 'elements/atm.Button';
import PPTextField from 'elements/atm.TextField';

const Wrapper = styled.form`
  width: 550px;
  display: flex;
  align-items: center;
  
  .flex-one {
    flex: 1;
    margin-right: 15px;
  }
  button {
    margin-top: 5px;
  }
`;

class InviteForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  state = {
    email: '',
  }

  onFieldChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      email: value,
    });
  }

  onSubmit = () => {
    const { handleSubmit } = this.props;
    handleSubmit(this.state.email);
  }

  render() {
    const { email } = this.state;

    return (
      <Wrapper>
        <div className="flex-one">
          <PPTextField
            type="email"
            name="email"
            hintText="example@name.example"
            floatingLabelText="Email"
            value={email}
            onChange={this.onFieldChange}
          />
        </div>
        <PPButton
          label="Send Invite"
          primary
          disabled={!email}
          onClick={this.onSubmit}
        />
      </Wrapper>
    );
  }
}

export default InviteForm;
