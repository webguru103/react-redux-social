import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanBrands } from 'config.routes/UserRoutePermissions';

import {
  fetchCurrentAccount,
} from 'containers/Main/actions';

import {
  makeSelectAccountBrands,
} from 'containers/Main/selectors';

import {
  makeSelectUserAccount,
} from 'containers/App/selectors';

import {
  makeSelectBrandCreated,
  makeSelectBrandDeleted,
} from './selectors';

import Wrapper from './Wrapper';
import AddBrandDialog from './AddBrandDialog';
import Header from './Header';
import BrandsList from './BrandsList';

class Brands extends Component {

  static propTypes = {
    userAccount: PropTypes.object,
    brands: PropTypes.array,
    isBrandCreated: PropTypes.bool,
    isBrandDeleted: PropTypes.bool,
    fetchAccount: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      isDialogShown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isBrandCreated !== nextProps.isBrandCreated ||
      this.props.isBrandDeleted !== nextProps.isBrandDeleted) {
      this.props.fetchAccount(this.props.userAccount.account_id);
    }
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  render() {
    const { userAccount, brands } = this.props;
    const { isDialogShown } = this.state;

    const numBrands = userAccount && userAccount.account_access && userAccount.account_access.num_brands;

    return (
      <Wrapper>
        <Header
          handleDialogToggle={this.handleDialogToggle}
          brandLimit={numBrands}
          numBrands={brands.length}
        />
        <BrandsList
          brands={brands}
        />
        <AddBrandDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchAccount: (accountId) => dispatch(fetchCurrentAccount(accountId)),
  };
}

const mapStateToProps = createStructuredSelector({
  brands: makeSelectAccountBrands(),
  userAccount: makeSelectUserAccount(),
  isBrandCreated: makeSelectBrandCreated(),
  isBrandDeleted: makeSelectBrandDeleted(),
});

export default UserCanBrands(connect(mapStateToProps, mapDispatchToProps)(Brands));
