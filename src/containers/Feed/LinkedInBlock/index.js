/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-underscore-dangle */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Link from 'react-toolbox/lib/link';

import Wrapper from './Wrapper';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '$dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

function getFormattedTime(time) {
  return moment(time).fromNow(true);
}

function processLinkedinText(post) {
  let comment = post.updateContent.companyStatusUpdate.share.comment;
  const shareContent = post.updateContent.companyStatusUpdate.share.content;

  if (shareContent && shareContent.shortenedUrl) {
    comment = comment.replace(shareContent.shortenedUrl, `<a class="ln-url" href="${shareContent.shortenedUrl}" target="_blank">${shareContent.shortenedUrl}</a>`);
  }

  return comment;
}

function LinkedInBlock({ post, connection }) {
  const connectionUrl = `//linkedin.com/company-beta/${connection.connection_uid}`;
  return (
    <Wrapper>
      <Header>
        <a className="ln-header-avatar" href={connectionUrl} target="_blank">
          <i className="fa fa-linkedin" />
        </a>
        <div>
          <a className="ln-header-channel-name" href={connectionUrl} target="_blank">{connection.display_name}</a>
          <span>{getFormattedTime(post.timestamp)}</span>
        </div>
      </Header>
      <Content>
        <div className="ln-comment" dangerouslySetInnerHTML={{ __html: processLinkedinText(post) }} />
      </Content>
      <Footer>
        <div className="ln-comment-details">
          <span className="ln-comment-detail">
            {post.numLikes} {post.numLikes === 1 ? 'Like' : 'Likes'}
          </span>
          <span className="ln-comment-dot" />
          <span className="ln-comment-detail">
            {post.updateComments._total} {post.updateComments._total === '1' ? 'Comment' : 'Comments'}
          </span>
        </div>
        <Link
          className="post-view-button"
          href={`//www.linkedin.com/hp/update/${post.updateKey.substr(post.updateKey.lastIndexOf('-') + 1)}`}
          target="_blank"
          label="View"
          icon="open_in_new"
        />
      </Footer>
    </Wrapper>
  );
}

LinkedInBlock.propTypes = {
  post: PropTypes.object,
  connection: PropTypes.object,
};

export default LinkedInBlock;
