/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Link from 'react-toolbox/lib/link';

import SocialIcon from 'elements/atm.SocialIcon';

import Wrapper from './Wrapper';
import ContentWrapper from './ContentWrapper';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1m',
    ss: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
  },
});

function getFormattedTime(time) {
  const postTime = moment(time);
  const nowTime = moment(new Date());
  const diff = nowTime.diff(postTime, 'days');
  if (diff > 0) {
    return postTime.format('MMM D');
  }
  return postTime.fromNow(true);
}

function processTwitterText(post) {
  let text = post.text;
  let isLarge = false;

  let hashIncreasedLength = 0;
  if (post.entities.hashtags && post.entities.hashtags.length) {
    post.entities.hashtags.map((hashtag) => {
      const hashUrl = `//twitter.com/hashtag/${hashtag.text}?src=hash`;
      const tag = `<a class="tw-hashtag" href="${hashUrl}" target="_blank">#${hashtag.text}</a>`;
      text = `${text.substr(0, hashtag.indices[0] + hashIncreasedLength)}${tag}${text.substr(hashtag.indices[1] + hashIncreasedLength)}`;
      hashIncreasedLength += tag.length - (hashtag.indices[1] - hashtag.indices[0]);
      return true;
    });
  }

  if (post.entities.urls && post.entities.urls.length) {
    post.entities.urls.map((url) => {
      text = text.replace(url.url, `<a class="tw-url" href="${url.url}" target="_blank">${url.display_url}</a>`);
      return true;
    });
  }

  if (post.entities.media && post.entities.media.length) {
    post.entities.media.map((media) => {
      text = text.replace(media.url, `<img class="tw-image" alt="Post" src="${media.media_url}" />`);
      isLarge = true;
      return true;
    });
  }

  text = `<span ${isLarge && 'class="large"'}>${text}</span>`;

  return text;
}

function TwitterBlock({ post, connection, index, isPreview }) {
  return (
    <Wrapper borderTop={index === '0'}>
      {post.user.screen_name ?
        <a href={`//twitter.com/${post.user.screen_name}`} target="_blank">
          <img className="tw-avatar" src={post.user.profile_image_url} alt="Avatar" />
        </a>
      :
        <SocialIcon icon={connection.channel_icon} />
      }
      <ContentWrapper>
        <Header>
          {post.user.screen_name ?
            <a href={`//twitter.com/${post.user.screen_name}`} target="_blank">
              <span className="tw-header-name">{post.user.name}</span>
            </a>
          :
            <span className="tw-header-name">{connection.display_name}</span>
          }
          {post.user.screen_name &&
            <span className="tw-header-id">@{post.user.screen_name}</span>
          }
          <span className="tw-header-dot" />
          <span className="tw-header-date">{getFormattedTime(post.created_at)}</span>
        </Header>
        <Content>
          <div className="tw-text" dangerouslySetInnerHTML={{ __html: processTwitterText(post) }} />
        </Content>
        {!isPreview &&
          <Footer>
            <div className="tw-footer-detail">
              <i className="fa fa-retweet" aria-hidden="true"></i>
              <span className="tw-footer-value">{post.retweet_count}</span>
            </div>
            <div className="tw-footer-detail">
              <i className="fa fa-heart" aria-hidden="true"></i>
              <span className="tw-footer-value">{post.favorite_count}</span>
            </div>
            <Link className="post-view-button" href={`//twitter.com/${post.user.screen_name}/status/${post.id_str}`}target="_blank" label="View" icon="open_in_new" />
          </Footer>
        }
      </ContentWrapper>
    </Wrapper>
  );
}

TwitterBlock.propTypes = {
  post: PropTypes.object,
  connection: PropTypes.object,
  index: PropTypes.string,
  isPreview: PropTypes.bool,
};

export default TwitterBlock;
