import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPDialog from 'elements/atm.Dialog';
import PPButton from 'elements/atm.Button';

import Wrapper from './Wrapper';

import { deleteBrandRequest } from '../actions';

class DeleteBrandDialog extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    deleteBrand: PropTypes.func,
    handleDialogToggle: PropTypes.func,
    accountId: PropTypes.string,
  }

  delete = (e) => {
    e.preventDefault();

    this.props.handleDialogToggle();
    this.props.deleteBrand({ account_id: this.props.accountId });
  }

  render() {
    const { active, handleDialogToggle } = this.props;

    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <Wrapper>
          <div className="header">
            <h2 className="title">Delete Brand</h2>
            <button onClick={handleDialogToggle}><i className="fa fa-times" aria-hidden="true" /></button>
          </div>
          <div className="divider" />
          <div className="body-wrapper">
            <p>Are you sure? You will not be able to recover this Brand and all of its posts.</p>
            <div className="button_wrapper">
              <PPButton
                type="submit"
                label="Delete"
                onClick={this.delete}
                primary
              />
              <button className="cancel" onClick={handleDialogToggle}>Cancel</button>
            </div>
          </div>
        </Wrapper>
      </PPDialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    deleteBrand: (data) => dispatch(deleteBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default (connect(mapStateToProps, mapDispatchToProps)(DeleteBrandDialog));
