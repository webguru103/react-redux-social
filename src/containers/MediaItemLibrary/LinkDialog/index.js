import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'elements/atm.FontIcon';
import PPDialog from 'elements/atm.Dialog';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';

function LinkDialog(props) {
  return (
    <PPDialog
      active={props.linkDialog}
      onEscKeyDown={props.closeAllDialog}
      onOverlayClick={props.closeAllDialog}
    >
      <Wrapper>
        <div className="header-info">
          <h3><span><i className="fa fa-link" />{}</span>Insert Link URL</h3>
          <button onClick={props.closeAllDialog}><FontIcon value="clear" /></button>
        </div>
        <div className="info-wrapper">
          <TextField
            type="text"
            floatingLabelText="Destination URL"
            value={props.urlValue}
            onChange={props.handleAddLinkValue}
          />
        </div>
        <div className="button-wrapper">
          <Button onClick={props.handleSubmit} primary>Add Link</Button>
        </div>
      </Wrapper>
    </PPDialog>
  );
}

LinkDialog.propTypes = {
  linkDialog: PropTypes.bool,
  urlValue: PropTypes.string,
  closeAllDialog: PropTypes.func,
  handleAddLinkValue: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default LinkDialog;
