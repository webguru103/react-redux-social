/* eslint-disable jsx-a11y/anchor-has-content */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Link from 'react-toolbox/lib/link';
import Linkify from 'react-linkify';

import Wrapper from './Wrapper';
import Content from './Content';
import Footer from './Footer';

function getFormattedTime(time) {
  return moment(time).format('MMMM D [at] h:mm:ss a');
}

function PinterestBlock({ post, isPreview }) {
  return (
    <Wrapper>
      {post.image.original.url &&
        <img src={post.image.original.url} alt="Pin" />
      }
      <Content>
        <Linkify properties={{ target: '_blank' }}>
          <div className="pin-note">{post.note}</div>
        </Linkify>
        <div className="pin-details">
          Pinned by&nbsp;
          <a href={post.creator.url} target="_blank">{post.creator.first_name}</a>
          &nbsp;on&nbsp;
          <a href={post.board.url} target="_blank">{post.board.name}</a>
        </div>
        <div className="pin-timestamp">{getFormattedTime(post.created_at)}</div>
      </Content>
      {!isPreview &&
        <Footer>
          <span className="pin-footer-detail">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>{post.counts.likes}</span>
          </span>
          <span className="pin-footer-detail">
            <i className="fa fa-share-alt" aria-hidden="true"></i>
            <span>{post.counts.comments}</span>
          </span>
          <span className="pin-footer-detail">
            <i className="fa fa-thumb-tack" aria-hidden="true"></i>
            <span>{post.counts.repins}</span>
          </span>
          <Link className="post-view-button" href={`//pinterest.com/pin/${post.id}`} target="_blank" label="View" icon="open_in_new" />
        </Footer>
      }
    </Wrapper>
  );
}

PinterestBlock.propTypes = {
  post: PropTypes.object,
  isPreview: PropTypes.bool,
};

export default PinterestBlock;
