/*
 * RSS Feeds
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PPDialog from 'elements/atm.Dialog';
import FontIcon from 'elements/atm.FontIcon';
import PPTextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import SimpleButton from 'elements/atm.SimpleButton';
import Spinner from 'elements/atm.Spinner';
import Dropdown from 'elements/atm.Dropdown';

import theme from 'theme';

import Wrapper from './Wrapper';
import ModalWrapper from './ModalWrapper';
import FeedItem from './FeedItem';

class RSS extends Component {
  static propTypes = {
    feeds: PropTypes.arrayOf(PropTypes.shape()),
    rssItems: PropTypes.arrayOf(PropTypes.shape()),
    getFeedItems: PropTypes.func,
    createFeed: PropTypes.func,
    handleAddLinkValueFromDialog: PropTypes.func,
    createPostSet: PropTypes.func,
  }
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      rssValue: '',
      selectedFeed: null,
      showModal: false,
    };

    this.handleInputChangeURL = this.handleInputChangeURL.bind(this);
    this.handleInputChangeName = this.handleInputChangeName.bind(this);
  }

  onFeedChange = (option) => {
    this.setState({ selectedFeed: option });
    this.props.getFeedItems(option.value);
  }

  handleInputChangeURL(event) {
    this.setState({ rssUrl: event.target.value });
  }

  createFeed = () => {
    const data = {
      url: this.state.rssUrl,
      name: this.state.rssName,
    };

    this.props.createFeed(data);
    this.setState({
      rssName: '',
      rssUrl: '',
    });
  }

  handleInputChangeName(event) {
    this.setState({ rssName: event.target.value });
  }

  render() {
    const selectOptions = this.props.feeds.length ? this.props.feeds.map((feed) => ({ value: feed.feed_id, label: feed.name })) : [];

    return (
      <Wrapper>
        <div className="container">
          <div className="header">
            <div className="filter-wrapper">
              <Dropdown label="Your RSS Feeds" value={this.state.selectedFeed} options={selectOptions} onChange={this.onFeedChange} />
            </div>
            <SimpleButton
              style={{ fontSize: '13px', fontWeight: 'bold' }}
              color={theme.textColor}
              onClick={() => this.setState({ showModal: true })}
              noBorder
            >
              + Add new rss feed
            </SimpleButton>
          </div>
          { this.state.isLoading && <Spinner /> }
          { !this.state.isLoading && this.props.rssItems && this.props.rssItems.map((item, i) =>
            <FeedItem
              key={i}
              item={item}
              feedName={this.state.selectedFeed && this.state.selectedFeed.label}
              onAddFeed={() => this.props.handleAddLinkValueFromDialog(item.source_url || item.source)}
              createPost={() => this.props.createPostSet(item)}
            />
            )
          }
        </div>
        {<PPDialog
          active={this.state.showModal}
          onEscKeyDown={() => this.setState({ showModal: false })}
          onOverlayClick={() => this.setState({ showModal: false })}
        >
          <ModalWrapper>
            <div className="header-info">
              <h3><span><i className="fa fa-rss" />{}</span>Add RSS Feed</h3>
              <button onClick={() => this.setState({ showModal: false })}><FontIcon value="clear" /></button>
            </div>
            <div className="info-wrapper">
              <div className="input-wrapper">
                <PPTextField
                  type="text"
                  floatingLabelText="RSS Feed URL"
                  value={this.state.rssUrl}
                  onChange={this.handleInputChangeURL}
                />
              </div>
              <div className="input-wrapper">
                <PPTextField
                  type="text"
                  floatingLabelText="Name of Feed"
                  value={this.state.rssName}
                  onChange={this.handleInputChangeName}
                />
              </div>
            </div>
            <div className="button-wrapper">
              <Button onClick={this.createFeed} primary>Add Feed</Button>
            </div>
          </ModalWrapper>
        </PPDialog>}
      </Wrapper>
    );
  }
}

export default RSS;
