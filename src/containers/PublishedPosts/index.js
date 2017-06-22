/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import {
  makeSelectUserAccount,
} from 'containers/App/selectors';

import Layout from './Layout';

const PublishedPostsContainer = ({
  params: { account_id, stream_category, stream_id },
  userAccount,
}) => {
  if (!userAccount) {
    return null;
  }

  return (
    <Layout
      accountId={account_id}
      streamCategory={stream_category}
      streamId={stream_id}
      userAccount={userAccount}
    />
  );
};

PublishedPostsContainer.propTypes = {
  params: PropTypes.object,
  userAccount: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
});

export default connect(mapStateToProps)(UserCanAccount(PublishedPostsContainer));
