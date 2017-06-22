import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import { Map } from 'immutable';
import { filter } from 'lodash';

import Popup from 'components/Popup';
import Avatar from 'elements/atm.Avatar';

import AssignBox from './AssignBox';
import Wrapper from './Wrapper';

class UserAssignment extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    postSet: PropTypes.object,
    assignee: PropTypes.object,
    users: PropTypes.array,
    updatePostSet: PropTypes.func,
  }

  static defaultProps = {
    assignee: new Map(),
  }

  state = {
    userListVisible: false,
  }

  handleClickOutside = () => {
    this.toggleUserList(false);
  }

  handleAssignUser = (userId) => {
    const { postSet } = this.props;

    this.props.updatePostSet({
      ...postSet,
      id: postSet.post_set_id,
      user_assignment_ids: [userId],
    });
    this.toggleUserList(false);
  }

  toggleUserList = (visible) => {
    this.setState({
      userListVisible: typeof visible === 'boolean' ? visible : !this.state.userListVisible,
    });
  }

  render() {
    const { userListVisible } = this.state;
    const { assignee, users } = this.props;

    const adminsOrEditors = filter(users, (u) => u.title === 'admins' || u.title === 'editors');
    const name = assignee.getIn(['user', 'display_name']);

    return (
      <Wrapper>
        <div className="assignee-wrapper" onClick={this.toggleUserList}>
          { assignee.get('user_id') ?
            <Avatar image={assignee.getIn(['user', 'properties', 'thumb_url'])} title={name} backgroundColor="green" size={36} isClickable={false} /> :
            <i className="fa fa-user" />
          }
          <div className="right-box">
            <div className="assigned-to">Assigned to</div>
            <div className="name">{name || 'Unassigned'}</div>
          </div>
        </div>
        { userListVisible &&
          <Popup top={45}>
            <AssignBox
              users={adminsOrEditors}
              assignee={assignee}
              handleAssignUser={this.handleAssignUser}
            />
          </Popup>
        }
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(UserAssignment);
