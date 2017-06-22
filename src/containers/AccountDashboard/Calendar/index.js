import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import ListWrapper from './ListWrapper';
import Item from './Item';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function Calendar({ posts, path }) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div className="title">Calendar</div>
        <div className="description">Go here to get a snapshot of your brand's upcoming posts and plan out your content.</div>
      </HeaderWrapper>
      <ListWrapper>
        <table>
          <tr className="header">
            <th className="preview" colSpan={2}>Preview</th>
            <th className="date">Date</th>
            <th className="channel">Channels</th>
          </tr>
          {posts && posts.count() > 0 &&
            posts.map((post) => <Item post={post} />)
          }
        </table>
        <div className="bottom-wrapper">
          <Link to={path}>
            <GoTo style={{ color: '#E35A88' }}>
              <span>View All</span><i className="fa fa-chevron-right" />
            </GoTo>
          </Link>
        </div>
      </ListWrapper>
    </Wrapper>
  );
}

Calendar.propTypes = {
  posts: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default Calendar;
