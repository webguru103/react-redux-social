import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Input from 'react-toolbox/lib/input';
import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';

import Wrapper from './Wrapper';

class CommentInput extends Component {
  static propTypes = {
    postComment: PropTypes.func,
    user: PropTypes.shape(),
  };

  state = { value: '' };

  onSend = () => {
    const { postComment } = this.props;
    postComment(this.state.value);
    this.setState({ value: '' });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { user } = this.props;
    const { value } = this.state;
    const avatarUrl = _.get(user, 'properties.thumb_url');
    const avatarClr = _.get(user, 'properties.color');
    const name = _.get(user, 'display_name');
    return (
      <Wrapper>
        <div className="avatar">
          <PPAvatar
            size={40}
            radius={2}
            image={avatarUrl}
            title={name}
            backgroundColor={avatarClr}
            isClickable={false}
          />
        </div>
        <div className="input">
          <Input
            type="text"
            placeholder="Add a comment"
            multiline
            value={value}
            onChange={this.onChange}
          />
        </div>
        <div className="send-button">
          <PPButton
            label="Say It"
            className="add-button"
            onClick={this.onSend}
            primary
            disabled={!value}
          />
        </div>
      </Wrapper>
    );
  }
}

export default CommentInput;
