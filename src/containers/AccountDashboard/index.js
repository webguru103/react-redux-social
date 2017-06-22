/*
 * Account Dashboard
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { getPostSets, fetchMediaItems, fetchPostSetsBySTRequest } from 'containers/App/actions';
import { makeSelectPostSets, makeSelectMediaItems, makeSelectPostSetsByST } from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Wrapper from './Wrapper';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import StatusBoards from './StatusBoards';
import Calendar from './Calendar';
import Posts from './Posts';
import Contents from './Contents';

class AccountDashboard extends Component {

  state = {
    accountId: this.props.params.account_id,
    upcomingPosts: List(),
    lastestMediaItems: List(),
    statusData: {},
    latestPosts: List(),
  };

  componentDidMount() {
    this.props.getPostSetsAction(this.props.params.account_id);
    this.props.getMediaItems(this.props.params.account_id);
    this.props.getPostSetsbyST(this.props.params.account_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.accountId !== nextProps.params.account_id) {
      this.setState({ accountId: nextProps.params.account_id }, () => {
        this.props.getMediaItems(nextProps.params.account_id);
        this.props.getPostSetsbyST(nextProps.params.account_id);
      });
    }

    if (this.props.postSets !== nextProps.postSets) {
      this.filterPosts(nextProps.postSets);
      this.filterBoardStatus(nextProps.postSets);
    }

    if (this.props.mediaItems !== nextProps.mediaItems) {
      this.filterMediaItems(nextProps.mediaItems);
    }

    if (!this.props.postSetsbyST.equals(nextProps.postSetsbyST)) {
      this.filterUpcomingPosts(nextProps.postSetsbyST);
    }
  }

  filterBoardStatus = (postSets) => {
    const readyPostSets = postSets.filter((postSet) => postSet.get('status') === '3').count() || 0;
    const inReviewPostSets = postSets.filter((postSet) => postSet.get('status') === '5').count() || 0;
    const draftPostSets = postSets.filter((postSet) => postSet.get('status') === '2').count() || 0;
    const ideaPostSets = postSets.filter((postSet) => postSet.get('status') === '6').count() || 0;

    this.setState({
      statusData: {
        readyPostSets,
        inReviewPostSets,
        draftPostSets,
        ideaPostSets,
      },
    });
  }

  filterUpcomingPosts = (postSets) => {
    const currentTimeStamp = moment().unix();
    const allPostSets = postSets.getIn(['data', 'scheduled_post_sets']);
    const upcomingPosts = allPostSets.filter((postSet) => postSet.get('schedule_time') >= currentTimeStamp).takeLast(3);
    this.setState({ upcomingPosts });
  }

  filterPosts = (postSets) => {
    const filteredPosts = postSets.filter((postSet) => postSet.get('status') === '2' || postSet.get('status') === '5');

    this.setState({
      latestPosts: filteredPosts.takeLast(5),
    });
  }

  filterMediaItems = (mediaItems) => {
    const lastestMediaItems = mediaItems.count() > 5 ? mediaItems.takeLast(6) : mediaItems;
    this.setState({ lastestMediaItems });
  }

  render() {
    const {
      accountId,
      statusData,
      lastestMediaItems,
      upcomingPosts,
      latestPosts,
    } = this.state;

    return (
      <Wrapper>
        <LeftPane>
          <StatusBoards data={statusData} path={`/account/${accountId}/boards`} />
          <Calendar posts={upcomingPosts} path={`/account/${accountId}/calendar`} />
        </LeftPane>
        <RightPane>
          <div className="pane-name">Recent Activity</div>
          <Posts posts={latestPosts} path={`/account/${accountId}/posts`} />
          <Contents mediaItems={lastestMediaItems} path={`/account/${accountId}/library`} />
        </RightPane>
      </Wrapper>
    );
  }
}

AccountDashboard.propTypes = {
  getPostSetsAction: PropTypes.func,
  getMediaItems: PropTypes.func,
  getPostSetsbyST: PropTypes.func,
  params: PropTypes.object,
  postSets: ImmutablePropTypes.list,
  mediaItems: ImmutablePropTypes.list,
  postSetsbyST: ImmutablePropTypes.map,
};

const mapDispatchToProps = (dispatch) => ({
  getPostSetsAction: (accountId) => dispatch(getPostSets(accountId)),
  getMediaItems: (accountId) => dispatch(fetchMediaItems(accountId)),
  getPostSetsbyST: (accountId) => dispatch(fetchPostSetsBySTRequest(accountId)),
});

const mapStateToProps = createStructuredSelector({
  account: makeSelectCurrentAccount(),
  postSets: makeSelectPostSets(),
  mediaItems: makeSelectMediaItems(),
  postSetsbyST: makeSelectPostSetsByST(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(AccountDashboard));
