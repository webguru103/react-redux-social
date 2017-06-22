import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';
import { find, filter } from 'lodash';

import { toastr } from 'lib/react-redux-toastr';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import Loading from 'components/Loading';
import CloseableDialog from 'elements/atm.CloseableDialog';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import PostEditor from 'containers/PostEditor';

import {
  fetchStreamPostSetsRequest,
  inviteEmailToStreamRequest,
  replicatePostSetRequest,
} from '../actions';
import {
  makeSelectPostSets,
  makeSelectPostSet,
  makeSelectEmailInvited,
} from '../selectors';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import TabBar from './TabBar';
import PostSetBox from './PostSetBox';
import InviteForm from './InviteForm';

class PowerStreamLayout extends Component {
  static propTypes = {
    hash: PropTypes.string,
    accountId: PropTypes.string,
    streamCategory: PropTypes.string,
    streamId: PropTypes.string,
    userAccount: PropTypes.object,
    postSets: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    emailInvited: ImmutablePropTypes.map,
    fetchStreamPostSets: PropTypes.func,  // eslint-disable-line
    updatePostSet: PropTypes.func,
    inviteEmailToStream: PropTypes.func,
    replicatePostSet: PropTypes.func,
  }

  state = {
    error: '',
    shareDialogVisible: false,
  }

  componentWillMount() {
    this.changeStreamLink(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streamCategory !== nextProps.streamCategory ||
      this.props.streamId !== nextProps.streamId) {
      this.changeStreamLink(nextProps);
    }

    if (this.props.postSet !== nextProps.postSet &&
      !nextProps.postSet.get('processing')) {
      if (nextProps.postSet.get('error')) {
        toastr.error('The post has NOT been updated.');
      } else {
        toastr.success('Success', 'The post has been updated successfully');
      }
    }

    if (this.props.emailInvited !== nextProps.emailInvited &&
      !nextProps.emailInvited.get('processing')) {
      if (!nextProps.emailInvited.get('error')) {
        this.toggleShareDialog();
      }
    }
  }

  changeStreamLink({ hash, userAccount, accountId, streamCategory, streamId, fetchStreamPostSets }) {
    let newStreamId = streamId;

    if (!streamId) {
      if (streamCategory === 'owned') {
        newStreamId = userAccount.account_streams[0].stream_id;
      } else {
        if (!userAccount.shared_streams || userAccount.shared_streams.length === 0) {
          this.setState({
            error: 'This brand does not have any current subscriptions to shared streams.',
          });
          return;
        }

        newStreamId = userAccount.shared_streams[0].stream_id;
      }
      this.setState({
        error: '',
      });

      browserHistory.push(`/account/${accountId}/library/shared_streams/${streamCategory}/${newStreamId}${hash}`);
    }
    fetchStreamPostSets(newStreamId, {
      query_by: 'stream_id',
    });
  }

  handlePostSet = (removing, postSet) => {
    const { updatePostSet, replicatePostSet, streamId, accountId, streamCategory } = this.props;
    const postSetObj = postSet.toJS();
    if (removing) {
      updatePostSet({
        ...postSetObj,
        id: postSet.get('post_set_id'),
        stream_ids: filter(postSetObj.stream_ids || [], (id) => id !== streamId),
      }, 'powerstream');
    } else {
      replicatePostSet(
        `/account/${accountId}/library/shared_streams/${streamCategory}/${streamId}`,
        {
          account_id: accountId,
          post_set_id: postSet.get('post_set_id'),
        }
      );
    }
  }

  sendInvite = (email) => {
    const { inviteEmailToStream, accountId, streamId } = this.props;

    inviteEmailToStream({
      accountId,
      stream_id: streamId,
      email,
      message: 'Invite to my stream',
    });
  }

  toggleShareDialog = () => {
    this.setState({
      shareDialogVisible: !this.state.shareDialogVisible,
    });
  }

  render() {
    const {
      postSets,
      userAccount,
      accountId,
      streamCategory,
      streamId,
      hash,
    } = this.props;
    const {
      error,
      shareDialogVisible,
    } = this.state;

    if (error) {
      return (
        <Wrapper>
          <ErrorWrapper>
            { error }
          </ErrorWrapper>
        </Wrapper>
      );
    }

    const owned = streamCategory === 'owned';
    const streams = owned ?
      userAccount.account_streams : userAccount.shared_streams;

    const tabs = streams.map((s) => ({
      label: s.title,
      link: `/account/${accountId}/library/shared_streams/${streamCategory}/${s.stream_id}`,
    }));
    const currentStream = find(streams, { stream_id: streamId });
    const streamName = (currentStream || {}).title;

    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : null;

    return (
      <Wrapper>
        <TabBar
          owned={owned}
          tabs={tabs}
          toggleShareDialog={this.toggleShareDialog}
        />
        <PostSetBox
          owned={owned}
          postSets={postSets.get('data')}
          streamName={streamName}
          handlePostSet={this.handlePostSet}
        />
        <CloseableDialog
          active={shareDialogVisible}
          onEscKeyDown={this.toggleShareDialog}
          onOverlayClick={this.toggleShareDialog}
          onClose={this.toggleShareDialog}
          title="Invite a new subscriber to Stream Name"
        >
          <InviteForm
            handleSubmit={this.sendInvite}
          />
        </CloseableDialog>
        { postsetId &&
          <PostEditor
            id={postsetId}
            accountId={accountId}
          />
        }
        { postSets.get('isFetching') && <Loading /> }
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSet: makeSelectPostSet(),
  emailInvited: makeSelectEmailInvited(),
});

const mapDispatchToProps = {
  fetchStreamPostSets: fetchStreamPostSetsRequest,
  updatePostSet: updatePostSetRequest,
  inviteEmailToStream: inviteEmailToStreamRequest,
  replicatePostSet: replicatePostSetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PowerStreamLayout));
