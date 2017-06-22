import React, { PropTypes } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map, List } from 'immutable';
import _ from 'lodash';
import { makeSelectCurrentChannel } from '../selectors';

import TopListItem from '../TopListItem';

import Info from '../Wrapper/Info';
import Wrapper from '../Wrapper/Wrapper';

const rules = {
  twitter: {
    tweets: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'tweet_count',
      content: 'Tweets',
      reKey: 'retween_count',
      reLabel: 'Retweets',
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    retweets: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'retweet_count',
      content: 'Retweets',
      reKey: 'tweet_count',
      reLabel: 'Tweets',
      hasDescription: true,
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    favorites: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'favorite_count',
      content: 'Favorites',
      reKey: 'tweet_count',
      reLabel: 'Tweets',
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    infos: {
      items: [
        { label: 'Tweets', valueKey: 'tweet_count' },
        { label: 'Favorites', valueKey: 'favorite_count' },
        { label: 'Retweets', valueKey: 'retweet_count' },
      ],
      imageUrlKey: 'user.profile_image_url',
      createTimeKey: 'created_at',
      descriptionKey: 'text',
    },
  },
  facebook: {
    posts: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      totalKey: 'post_count',
      content: 'Posts',
      reKey: 'comments',
      reLabel: 'Comments',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    fans: {
      infoMonth: 'analytics.extended.page_fans_by_months_ago_difference',
      infoWeek: 'analytics.extended.page_fans_by_weeks_ago_difference',
      monthDifference: true,
      totalKey: '',
      content: 'Fans',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    impressions: {
      infoMonth: 'analytics.extended.unique_page_impressions_by_months_ago',
      infoWeek: 'analytics.extended.unique_page_impressions_by_weeks_ago',
      monthDifference: true,
      totalKey: '',
      content: 'Impressions',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    likes: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      content: 'Likes',
      totalKey: 'likes',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    comments: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      content: 'Comments',
      totalKey: 'comments',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    infos: {
      infoMonth: 'analytics.posts_by_month',
      items: [
        { label: 'Likes', valueKey: 'likes.summary.total_count' },
        { label: 'Comments', valueKey: 'comments.summary.total_count' },
      ],
      imageUrlKey: 'picture',
      createTimeKey: 'created_time',
      descriptionKey: 'description',
    },
  },
  pinterest: {
    pins: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Pins',
      totalKey: 'pin_count',
      topByEngagementKey: 'top_pins_by_engagement',
    },
    're-pins': {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Re-Pins',
      totalKey: 'repins',
      topByEngagementKey: 'top_pins_by_engagement',
    },
    likes: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Likes',
      totalKey: 'likes',
      topByEngagementKey: 'top_pins_by_engagement',
    },
    comments: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Comments',
      totalKey: 'comments',
      topByEngagementKey: 'top_pins_by_engagement',
    },
    infos: {
      items: [
        { label: 'Likes', valueKey: 'counts.likes' },
        { label: 'Comments', valueKey: 'counts.comments' },
        { label: 'Re-pins', valueKey: 'counts.repins' },
      ],
      imageUrlKey: 'image.original.url',
      createTimeKey: 'created_at',
      descriptionKey: 'note',
    },
  },
  linkedin: {
    posts: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      totalKey: 'post_count',
      content: 'Posts',
      reKey: 'comments',
      reLabel: 'Comments',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    likes: {
      infoMonth: 'analytics.total_followers_by_month',
      infoWeek: 'analytics.total_followers_by_weeks_ago',
      content: 'Likes',
    },
    comments: {
      infoMonth: 'analytics.organic_followers_by_month',
      infoWeek: 'analytics.organic_followers_by_weeks_ago',
      content: 'Comments',
    },
    infos: {
      items: [
        { label: 'Likes', valueKey: 'numLikes' },
      ],
      imageUrlKey: 'updateContent.companyStatusUpdate.share.content.submittedImageUrl',
      createTimeKey: 'updateContent.companyStatusUpdate.share.timestamp',
      descriptionKey: 'updateContent.companyStatusUpdate.share.comment',
    },
  },
};

class MainInfo extends React.Component {

  static propTypes = {
    activeChannel: PropTypes.shape(),
    subChannel: PropTypes.string,
    isMonth: PropTypes.bool,
  }

  getRule() {
    const { activeChannel, isMonth, subChannel } = this.props;
    const channel = activeChannel.getIn(['connection', 'channel']);
    return {
      ..._.get(rules, `${channel}.${subChannel}`),
      info: _.get(rules, `${channel}.${subChannel}.${isMonth ? 'infoMonth' : 'infoWeek'}`),
    };
  }

  getInfos() {
    const { activeChannel } = this.props;
    const channel = activeChannel.getIn(['connection', 'channel']);
    return _.get(rules, `${channel}.infos`, {});
  }

  getTotaldata() {
    let total = 0;
    const { activeChannel, isMonth } = this.props;
    const rule = this.getRule();
    const info = activeChannel.getIn(rule.info ? rule.info.split('.') : []) || Map();
    const keys = Object.keys(info.toJS());
    const last = keys[0];
    let re = `0 ${rule.reLabel}`;
    if (last != null) {
      if (rule.totalKey) {
        total = info.getIn([last, rule.totalKey]);
      } else {
        total = info.getIn([last]);
      }
      re = `${info.getIn([last, rule.reKey]) || 0} ${rule.reLabel}`;
    }
    const contents = `${total} ${rule.content}`;
    const content = rule.content;
    return (
      <div>
        <h1><b>{total || 0}</b></h1>
        <h5>{content} this {isMonth ? 'month' : 'week'}</h5><br />
        {rule.hasDescription && <h5>Based on {re} sent in the last week you averaged <b>{contents} </b>per post.</h5>}
      </div>
    );
  }

  getNameDate(index, isMonth) {
    const d = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (isMonth) {
      d.setMonth(d.getMonth() - index);
      return `${monthNames[d.getMonth()]}`;
    }
    d.setDate(d.getDate() - (7 * index));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  getChartsData() {
    const data = [];
    const { activeChannel, isMonth } = this.props;
    const rule = this.getRule();
    const info = activeChannel.getIn(rule.info ? rule.info.split('.') : []) || List();
    const length = isMonth ? 3 : 12;
    Array(length).fill(0).forEach((zeroItem, index) => {
      const infoItem = isMonth && !rule.monthDifference
        ? info.filter((item, key) => parseInt(key, 10) - 1 === ((new Date().getMonth() - index) + 12) % 12).first()
        : info.filter((item, key) => parseInt(key, 10) === index).first();
      let value = 0;
      if (infoItem) value = rule.totalKey ? infoItem.get(rule.totalKey) : infoItem;
      data.push({
        name: this.getNameDate(parseInt(index, 10), isMonth),
        [rule.content]: value,
        index,
        radius: [4, 4, 0, 0],
      });
    });

    return data.sort((a, b) => a.index < b.index ? 1 : -1).slice(0, isMonth ? 3 : 12);
  }

  render() {
    let TopItemsList = 'You Currently have no Posts.';
    const { activeChannel } = this.props;
    const rule = this.getRule();
    const { infoMonth, items, imageUrlKey, createTimeKey, descriptionKey } = this.getInfos();
    const itemInfo = activeChannel.getIn((infoMonth || rule.infoMonth) ? (infoMonth || rule.infoMonth).split('.') : []) || Map();
    const keys = Object.keys(itemInfo.toJS());
    const last = keys[0];
    if (last !== null) {
      const topItems = itemInfo.getIn([last, rule.topByEngagementKey]) || [];
      TopItemsList = topItems.map((topItem, index) =>
        <TopListItem
          topItem={topItem}
          key={index}
          infos={
            items.map((item) => ({
              label: item.label,
              value: (item.additionalKey ? topItem.getIn(item.valueKey.split('.'))[item.additionalKey] : topItem.getIn(item.valueKey.split('.'))) || 0,
            }))
          }
          imageUrlKey={imageUrlKey}
          createTimeKey={createTimeKey}
          descriptionKey={descriptionKey}
        />
      );
    }

    return (
      <Info>
        <Wrapper>
          <div className={['col-md-4', 'col-sm-4', 'col-xs-4'].join(' ')}>
            {this.getTotaldata()}
          </div>
          <div className={['col-md-8', 'col-sm-8', 'col-xs-8'].join(' ')}>
            <BarChart width={650} height={200} data={this.getChartsData()} margin={{ top: 5, right: 30, left: 20, bottom: 1 }}>
              <XAxis dataKey="name" stroke="#888888" tickLine={false} />
              <YAxis tickLine={false} stroke="#888888" axisLine={false} />
              <CartesianGrid vertical={false} stroke="rgba(207,216,220,0.7)" strokeWidth={1.35} />
              <Tooltip />
              <Bar dataKey={rule.content} fill="#C8CED0" barSize={33} />
            </BarChart>
          </div>
        </Wrapper>
        <div>
          <h3 className="top-this-month">Top Posts Current Month</h3>
          {TopItemsList}
        </div>
      </Info>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps)(MainInfo));
