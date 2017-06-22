import React from 'react';
import PropTypes from 'prop-types';

import PPButton from 'elements/atm.Button';

import Wrapper from './Wrapper';
import Status from './Status';

function Header({ handleDialogToggle, brandLimit, numBrands }) {
  return (
    <Wrapper>
      <PPButton
        label="Add New Brand"
        onClick={handleDialogToggle}
        primary
      />
      <Status>{brandLimit - numBrands} of {brandLimit} Brands Remaining</Status>
    </Wrapper>
  );
}

Header.propTypes = {
  handleDialogToggle: PropTypes.func,
  brandLimit: PropTypes.number,
  numBrands: PropTypes.number,
};

export default Header;
