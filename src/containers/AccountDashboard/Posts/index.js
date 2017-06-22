import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import Item from './Item';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function Posts({ posts, path }) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div className="title">Posts</div>
        <div className="description">Go here to quickly edit, review and approve posts.</div>
      </HeaderWrapper>
      <table>
        <tr className="header">
          <th className="posts">Latest Posts</th>
          <th className="date">Date</th>
          <th className="status">Status</th>
        </tr>
        { posts && posts.count() > 0 &&
          posts.map((post) => <Item post={post} />)
        }
      </table>
      <div className="bottom-wrapper">
        <Link to={path}>
          <GoTo style={{ color: '#616669', float: 'right' }}>
            <span>View All</span><i className="fa fa-chevron-right" />
          </GoTo>
        </Link>
      </div>
    </Wrapper>
  );
}

Posts.propTypes = {
  posts: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default Posts;
