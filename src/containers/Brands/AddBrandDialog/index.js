import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPDialog from 'elements/atm.Dialog';

import {
  makeSelectUser,
  makeSelectUserAccount,
} from 'containers/App/selectors';

import BrandUploadForm from './BrandUploadForm';

import { createBrandRequest } from '../actions';

class AddBrandDialog extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    userOwnAccount: PropTypes.object,
    createBrand: PropTypes.func,
    handleDialogToggle: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const userOwnAccount = this.props.userOwnAccount || {};
    const userOwnAccountProperties = (userOwnAccount && userOwnAccount.properties) || {};

    this.state = {
      active: this.props.active,
      accountColor: userOwnAccountProperties.color,
    };
  }

  createNewBrand = (content) => {
    const data = {
      account_id: this.props.userOwnAccount.account_id,
      display_name: content.brandName,
      thumbnail_image_key: content.avatarKey,
      color: content.backgroundColor,
    };

    this.props.handleDialogToggle();
    this.props.createBrand(data);
  }

  render() {
    const { active, handleDialogToggle } = this.props;
    const { accountColor } = this.state;

    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <BrandUploadForm
          avatarColor={accountColor}
          addBrand={this.createNewBrand}
          onCancel={this.props.handleDialogToggle}
        />
      </PPDialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createBrand: (data) => dispatch(createBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userOwnAccount: makeSelectUserAccount(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(AddBrandDialog));
