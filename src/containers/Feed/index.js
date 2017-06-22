/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'react-toolbox/lib/link';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import loadingImage from 'assets/images/loading_circle.gif';

import Wrapper from './Wrapper';
import FacebookBlock from './FacebookBlock';
import TwitterBlock from './TwitterBlock';
import LinkedInBlock from './LinkedInBlock';
import PinterestBlock from './PinterestBlock';

import {
  fetchSocialFeed,
} from './actions';

import {
  makeSelectSocialFeed,
  makeSelectConnection,
} from './selectors';


/**
 * Feed is the container for all social feeds -
 * i.e. Facebook, Twitter, Pinterest, LinkedIn and WordPress
 */
class Feed extends Component {

  state = {
    connectionId: null,
  };

  componentDidMount() {
    this.fetchFeed(this.props);
  }

  componentWillReceiveProps(props) {
    if (this.props.location !== props.location) {
      this.fetchFeed(props);
    }
  }

  fetchFeed = (props) => {
    const { location, getSocialFeed } = props;
    const connectionId = location.pathname.split('/').pop();
    getSocialFeed(connectionId);

    this.setState({
      connectionId,
    });
  }

  renderFeedHeader = () => {
    const { feed, connection } = this.props;

    if (!feed || feed.length === 0) {
      return null;
    }
    return (
      <div className="feed-header">
        <i className={`fa fa-${connection.channel}`} aria-hidden="true"></i>
        <span>{connection.display_name}</span>
      </div>
    );
  }

  renderFeedFooter = () => {
    const { feed, connection } = this.props;

    if (!feed || feed.length === 0) {
      return null;
    }

    let url = '';
    switch (connection.channel) {
      case 'facebook':
        url = `//facebook.com/${connection.connection_uid}`;
        break;
      case 'twitter':
        url = `//twitter.com/${feed[0].user.screen_name}`;
        break;
      case 'linkedin':
        url = `//linkedin.com/company-beta/${connection.connection_uid}`;
        break;
      case 'pinterest':
        url = feed[0].board.url;
        break;
      default:
        break;
    }
    return (
      <div className="feed-footer">
        <Link className="feed-view-button" href={url} target="_blank" label="View All Posts for this Channel" icon="open_in_new" />
      </div>
    );
  }

  renderFeedBlocks = () => {
    const { feed, connection } = this.props;

    if (feed === null) {
      return <img className="feed-loading" src={loadingImage} alt="Loading..." />;
    } else if (Array.isArray(feed) && feed.length === 0) {
      return <div className="feed-description">No posts available</div>;
    }

    return (
      <div className="feed-blocks">
        <div className="feed-description">Up to the last 25 posts from this channel are below.</div>
        {
          Object.keys(feed).map((key) => key >= 0 && key < 25 && this.renderBlock(feed[key], connection, key))
        }
      </div>
    );
  }

  renderBlock = (post, connection, index) => {
    switch (connection.channel) {
      case 'facebook':
        return (<FacebookBlock key={post.id} post={post} connection={connection} />);
      case 'twitter':
        return (<TwitterBlock key={post.id} post={post} connection={connection} index={index} />);
      case 'linkedin':
        return (<LinkedInBlock key={post.updateKey} post={post} connection={connection} />);
      case 'pinterest':
        return (<PinterestBlock key={post.id} post={post} connection={connection} />);
      default:
        return '';
    }
  }

  render() {
    return (
      <Wrapper>
        {this.renderFeedHeader()}
        {this.renderFeedBlocks()}
        {this.renderFeedFooter()}
      </Wrapper>
    );
  }
}

Feed.propTypes = {
  location: PropTypes.object,
  getSocialFeed: PropTypes.func,
  feed: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  connection: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    getSocialFeed: (connectionId) => dispatch(fetchSocialFeed(connectionId)),
  };
}

const mapStateToProps = createStructuredSelector({
  feed: makeSelectSocialFeed(),
  connection: makeSelectConnection(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Feed));
