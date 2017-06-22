import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import {
  createPostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectPostSets,
  makeSelectPostSet,
} from 'containers/App/selectors';
import Loading from 'components/Loading';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetBox from './PostSetBox';

class PublishedPostsLayout extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    createPostSet: PropTypes.func,
  }

  state = {
    error: '',
    shareDialogVisible: false,
  }

  componentWillMount() {
  }

  /* componentWillReceiveProps(nextProps) {
    if (this.props.postSet !== nextProps.postSet &&
      !nextProps.postSet.get('processing')) {
      if (nextProps.postSet.get('error')) {
        toastr.error('The post has not been deleted from the stream.');
      } else {
        toastr.success('Success', 'The post has been deleted from the stream');
      }
    }
  } */

  render() {
    const {
      postSets,
      createPostSet,
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

    const postSetsFiltered = postSets.sort((a, b) => b.get('creation_time') - a.get('creation_time')).slice(0, 50);

    return (
      <Wrapper>
        <PostSetBox
          postSets={postSetsFiltered}
          createPostSet={createPostSet}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSet: makeSelectPostSet(),
});

const mapDispatchToProps = {
  createPostSet: createPostSetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PublishedPostsLayout));
