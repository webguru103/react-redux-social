import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import {
  makeSelectPostSets,
  makeSelectPostSetsByST,
  makeSelectPostSet,
} from 'containers/App/selectors';
import Loading from 'components/Loading';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetBox from './PostSetBox';

class PostsLayout extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.list,
    postSetsByST: ImmutablePropTypes.map,
    // postSet: ImmutablePropTypes.map,
    accountId: PropTypes.string,
  }

  state = {
    error: '',
    shareDialogVisible: false,
  }

  componentWillMount() {
  }

  render() {
    const {
      postSets,
      postSetsByST,
      accountId,
    } = this.props;
    const {
      error,
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

    if (postSets.get('isFetching')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <PostSetBox
          postSets={postSets}
          postSetsByST={postSetsByST}
          accountId={accountId}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSetsByST: makeSelectPostSetsByST(),
  postSet: makeSelectPostSet(),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PostsLayout));
