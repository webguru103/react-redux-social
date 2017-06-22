import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PPDialog from 'elements/atm.Dialog';
import PPButton from 'elements/atm.Button';

import Wrapper from './Wrapper';

class DeletePostSetDialog extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    deletePostSet: PropTypes.func,
    handleDialogToggle: PropTypes.func,
  }

  delete = (e) => {
    e.preventDefault();

    this.props.handleDialogToggle();
    this.props.deletePostSet();
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
            <h2 className="title">Delete Post Set</h2>
            <button onClick={handleDialogToggle}><i className="fa fa-times" aria-hidden="true" /></button>
          </div>
          <div className="divider" />
          <div className="body-wrapper">
            <p>Are you sure? You will not be able to recover this Post Set and all of its posts.</p>
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

export default DeletePostSetDialog;
