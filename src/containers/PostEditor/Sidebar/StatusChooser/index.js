import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import { toastr } from 'lib/react-redux-toastr';
import Dropdown from 'elements/atm.Dropdown';

import Wrapper from './Wrapper';

const statusOptions = [
  { value: '6', label: 'Idea', color: '#ACB5B8' },
  { value: '2', label: 'Draft', color: '#67C5E6' },
  { value: '5', label: 'Review', color: '#B171B5' },
  { value: '3', label: 'Ready', color: '#ABE66A' },
];

class StatusChooser extends React.Component {

  static propTypes = {
    postSet: ImmutablePropTypes.map,
    updatePostSet: PropTypes.func,
    userAccount: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { postSet } = props;
    const statusValue = postSet.getIn(['details', 'status']);
    const status = statusOptions.filter((option) =>
      option.value === statusValue
    )[0];
    this.state = {
      status,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { postSet } = this.props;
    if (!postSet.isEmpty() && nextProps.postSet.getIn(['details', 'status']) !== postSet.getIn(['details', 'status'])) {
      this.updateStatus(nextProps);
      if (postSet.getIn(['details', 'status']) && postSet.getIn(['details', 'post_set_id']) === nextProps.postSet.getIn(['details', 'post_set_id'])) {
        this.showSuccessGrowl(nextProps);
      }
    }
  }

  getGrowlType = (postSet) => {
    if (!postSet || postSet.isEmpty()) return false; // No posts
    const posts = postSet.getIn(['details', 'posts']);
    let hasScheduledPost = false;
    let hasPostUponReadyPost = false;
    posts.map((post) => {
      const status = post.get('status');
      if (status === '0') return false;
      if (status !== '5' && post.get('schedule_time') && moment().diff(moment.unix(post.get('schedule_time'))) < 0) {
        hasScheduledPost = true;
      }
      if (status === '5') {
        hasPostUponReadyPost = true;
      }
      return true;
    });

    const { userAccount } = this.props;
    const streamIds = postSet.getIn(['details', 'stream_ids']);
    const accountStreamId = userAccount.account_streams[0].stream_id;
    const index = streamIds.findIndex((id) => id === accountStreamId);
    const streamEnabled = index > -1;

    if (!hasScheduledPost && !hasPostUponReadyPost && !streamEnabled) return false;
    return {
      hasScheduledPost,
      hasPostUponReadyPost,
      streamEnabled,
    };
  }

  showSuccessGrowl = ({ postSet }) => {
    if (!postSet || postSet.isEmpty() || postSet.getIn(['details', 'status']) !== '3') return;
    const growlType = this.getGrowlType(postSet);

    if (growlType) {
      const { hasScheduledPost, hasPostUponReadyPost, streamEnabled } = growlType;
      let message = '';
      if (hasScheduledPost) {
        message += 'Your post will be published on the channels and times scheduled.';
      } else if (hasPostUponReadyPost) {
        message += 'Your post has been published on the channels and times scheduled.';
      }
      if (streamEnabled) message += 'Your post is now available in this brand\'s shared stream.';
      toastr.success('Success', message);
    }
  }

  updateStatus = ({ postSet }) => {
    if (!postSet || postSet.isEmpty()) return;
    const statusValue = postSet.getIn(['details', 'status']);
    const status = statusOptions.filter((option) =>
      option.value === statusValue
    )[0];
    this.setState({ status });
  }

  handleStatusChange = (option) => {
    const { postSet, updatePostSet } = this.props;
    if (option.value === '3') {
      const growlType = this.getGrowlType(postSet);
      if (!growlType) {
        toastr.error('Failed!', 'You must either set one channel and time for this post or add it to the shared stream.');
        this.setState({ status: { ...this.state.status } });
        return;
      }
    }
    const newPostSet = {
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
      status: option.value,
    };
    updatePostSet(newPostSet);
    this.setState({ status: option });
  }

  render() {
    const { status } = this.state;
    return (
      <Wrapper>
        <div className="status-chooser-title">Status</div>
        <div className="dropdown-wrapper">
          <Dropdown
            value={status}
            options={statusOptions}
            placeholder="Choose Status"
            onChange={this.handleStatusChange}
          />
        </div>
      </Wrapper>
    );
  }
}

export default StatusChooser;
