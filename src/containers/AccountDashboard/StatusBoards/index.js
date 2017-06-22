import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import Header from './Header';
import CardWraper from './CardWrapper';
import StatusItem from './StatusItem';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function StatusBoard({ data, path }) {
  return (
    <Wrapper>
      <Header>
        <HeaderWrapper>
          <div className="title">Status Boards</div>
          <div className="description">Check the status of upcoming posts.</div>
        </HeaderWrapper>
        <Link to={path}>
          <GoTo style={{ color: '#E35A88' }}>
            <span>View All</span><i className="fa fa-chevron-right" />
          </GoTo>
        </Link>
      </Header>
      <CardWraper>
        <StatusItem>
          <div className="item-wrapper">
            <div className="icon"><i className="fa fa-thumbs-o-up" /></div>
            <div className="count">{data.readyPostSets}</div>
            <div className="status">Ready</div>
          </div>
        </StatusItem>
        <div className="divider" />
        <StatusItem>
          <div className="item-wrapper">
            <div className="icon"><i className="fa fa-check-square-o" /></div>
            <div className="count">{data.inReviewPostSets}</div>
            <div className="status">Review</div>
          </div>
        </StatusItem>
        <div className="divider" />
        <StatusItem>
          <div className="item-wrapper">
            <div className="icon"><i className="fa fa-pencil" /></div>
            <div className="count">{data.draftPostSets}</div>
            <div className="status">Drafts</div>
          </div>
        </StatusItem>
        <div className="divider" />
        <StatusItem>
          <div className="item-wrapper">
            <div className="icon"><i className="fa fa-lightbulb-o" /></div>
            <div className="count">{data.ideaPostSets}</div>
            <div className="status">Ideas</div>
          </div>
        </StatusItem>
      </CardWraper>
    </Wrapper>
  );
}

StatusBoard.propTypes = {
  data: PropTypes.shape(),
  path: PropTypes.string,
};

export default StatusBoard;
