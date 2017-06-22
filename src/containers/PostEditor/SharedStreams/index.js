import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  updatePostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectUserAccount,
} from 'containers/App/selectors';

import SharedStreamsComponent from './Component';

const SharedStreams = ({ userAccount, postSet, updatePostSet }) => {
  const details = postSet.get('details');
  // This doesn't refresh upon props changing once it is initialized.

  return (
    !details.isEmpty() && <SharedStreamsComponent
      accountStreamId={userAccount.account_streams[0].stream_id}
      postSet={postSet}
      updatePostSet={updatePostSet}
    />
  );
};

SharedStreams.propTypes = {
  userAccount: PropTypes.object,
  postSet: PropTypes.object,
  updatePostSet: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedStreams);
