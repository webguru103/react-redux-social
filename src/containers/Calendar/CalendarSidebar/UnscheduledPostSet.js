/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { browserHistory } from 'react-router';

import { MenuItem } from 'react-toolbox/lib/menu';

import Popup from './Popup';

const CustomMenuItem = styled(MenuItem)`
  width: 170px;
  height: 36px;

  i {
    color: #8C9496;
  }

  span {
    flex-grow: 0;
  }

  &:hover {
    background: #E81C64 !important;
    i {
      color: white !important;
    }
    div {
      color: white !important;
    }
  }
`;

const MenuItemCaption = styled.div`
  color: #8C9496;
  margin-left: 10px;
`;

class UnscheduledPost extends React.Component {

  static propTypes = {
    onDelete: PropTypes.func,
    postSet: PropTypes.object,
    currentAccount: PropTypes.object,
  };

  state = {
    menuVisible: false,
  };

  handleClickDelete = (e) => {
    const { postSet, onDelete } = this.props;
    e.stopPropagation();
    onDelete(postSet);
  }

  handleHidePopup = () => {
    this.setState({ menuVisible: false });
  }

  handleShowEditor = () => {
    const { postSet, currentAccount } = this.props;
    browserHistory.push({
      pathname: `/account/${currentAccount.account_id}/calendar`,
      hash: `#postset-${postSet.post_set_id}`,
      state: { prevUrl: window.location.href },
    });
  }

  handleShowPopup = (e) => {
    e.stopPropagation();
    this.setState({
      menuVisible: true,
    });
  }

  render() {
    const { postSet } = this.props;
    const { menuVisible } = this.state;

    return (
      <div key={postSet.post_set_id} className={`cal-sidebar-unscheduled-item ${menuVisible && 'active'}`} onClick={this.handleShowEditor}>
        {postSet.title || 'Untitled post'}
        <i className="fa fa-ellipsis-h" onClick={this.handleShowPopup} />
        {menuVisible &&
          <Popup onOutsideClick={this.handleHidePopup}>
            <CustomMenuItem onClick={this.handleClickDelete}>
              <i className="fa fa-trash" />
              <MenuItemCaption>Delete</MenuItemCaption>
            </CustomMenuItem>
          </Popup>
        }
      </div>
    );
  }
}

export default UnscheduledPost;
