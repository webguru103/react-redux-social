import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';
import PPAvatar from 'elements/atm.Avatar';

import MenuPopover from './MenuPopover';
import Wrapper from './Wrapper';

const getStyledComment = (comment) =>
  comment.split('@').map((cm1, index) =>
    <span key={index}>
      <span className={index ? 'person-link' : ''}>
        {`${index ? '@' : ''}${cm1.split(' ')[0]}`}
      </span>
      <span>
        {` ${cm1.split(' ').slice(1).join(' ')}`}
      </span>
    </span>
  );

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.shape(),
    removable: PropTypes.bool,
    remove: PropTypes.func,
  }

  state = { popOver: false };

  showPopover = (e) => {
    e.stopPropagation();
    this.setState({ popOver: true });
  }

  hidePopover = () => {
    this.setState({ popOver: false });
  }

  handleClickOutside() {
    this.setState({ popOver: false });
  }

  remove = (commentId, event) => {
    event.stopPropagation();
    this.setState({ popOver: false });
    this.props.remove(commentId);
  }

  render() {
    const { comment, removable } = this.props;
    const { popOver } = this.state;
    const avatarUrl = comment.getIn(['user', 'properties', 'thumb_url']);
    const avatarClr = comment.getIn(['user', 'properties', 'color']);
    const name = comment.getIn(['user', 'display_name']);
    const time = moment(comment.getIn(['creation_time']) * 1000).fromNow();
    const text = comment.getIn(['text']);
    return (
      <Wrapper onClick={this.hidePopover}>
        <div className="avatar">
          <PPAvatar
            size={25}
            radius={4}
            image={avatarUrl}
            title={name}
            backgroundColor={avatarClr}
            isClickable={false}
          />
        </div>
        <div className="comment-content">
          <div className="heading">
            <div className="name">{name}</div>
            <div className="time">{time}</div>
          </div>
          <div className="comment">{getStyledComment(text)}</div>
        </div>
        {
          removable &&
          <div className="ellipsis" onClick={this.showPopover} >
            <i className="fa fa-ellipsis-h" />
            <MenuPopover
              onDelete={(e) => this.remove(comment.get('comment_id'), e)}
              show={popOver}
            />
          </div>
        }
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(Comment);
