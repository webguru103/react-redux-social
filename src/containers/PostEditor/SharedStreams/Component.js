import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import classnames from 'classnames';

import MultiLineInput from 'components/MultiLineInput';
import PopupBorder from 'components/PopupBorder';

import Wrapper from './Wrapper';

const streams = [
  { name: 'message_facebook', icon: 'fa fa-facebook-square', color: '#39579A' },
  { name: 'message_twitter', icon: 'fa fa-twitter-square', color: '#44ABF6' },
  { name: 'message_linkedin', icon: 'fa fa-linkedin-square', color: '#2278B8' },
  { name: 'message_pinterest', icon: 'fa fa-pinterest-square', color: '#BD081C' },
  { name: 'message_google', icon: 'fa fa-google-plus-square', color: '#DD4E41' },
];

class SharedStreamsComponent extends Component {
  static propTypes = {
    accountStreamId: PropTypes.string,
    postSet: PropTypes.object,
    updatePostSet: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const postDetails = props.postSet.get('details');

    this.state = {
      includePost: postDetails.get('stream_ids').includes(props.accountStreamId),
      streamIndex: 0,   // defaults to facebook
      message: '',
      allMessage: postDetails.get('message'),
      streamMessage: postDetails.get('properties').toJS(),
    };
  }

  componentDidMount() {
    this.switchStream(0); // defaults to facebook
  }

  handleMessageChange = (value) => {
    this.setState({
      message: value,
    });
  }

  handleMessageSave = () => {
    const { postSet, updatePostSet } = this.props;
    const { message, streamMessage, streamIndex } = this.state;

    const postDetails = postSet.get('details').toJS();
    const streamName = streams[streamIndex].name;
    const newStreamMessage = {
      ...streamMessage,
      [streamName]: message,
    };
    this.setState({
      streamMessage: newStreamMessage,
    });

    updatePostSet({
      ...postDetails,
      id: postDetails.post_set_id,
      properties: newStreamMessage,
    });
  }

  handleStreamClick = (streamIndex) => {
    const { includePost } = this.state;
    if (includePost) {
      this.switchStream(streamIndex);
    }
  }

  switchStream = (streamIndex) => {
    const { allMessage, streamMessage } = this.state;

    const streamName = streams[streamIndex].name;

    this.setState({
      streamIndex,
      message: streamMessage[streamName] || allMessage,
    });
  }

  toggleIncludePost = () => {
    const { accountStreamId, postSet, updatePostSet } = this.props;
    const { includePost } = this.state;
    const postDetails = postSet.get('details').toJS();
    const streamIds = postSet.getIn(['details', 'stream_ids']).toJS();
    let newStreamIds;

    this.setState({
      includePost: !includePost,
    });

    if (includePost) {
      newStreamIds = streamIds.filter((id) => (id !== accountStreamId));
    } else {
      newStreamIds = [...streamIds, accountStreamId];
    }

    updatePostSet({
      ...postDetails,
      id: postDetails.post_set_id,
      stream_ids: newStreamIds,
    });
  }

  render() {
    const { includePost, streamIndex, message } = this.state;

    return (
      <Wrapper>
        <div className="first-row">
          <span className="include-label">Include this post in this brand's shared stream?</span>
          <Toggle
            defaultChecked={includePost}
            icons={false}
            onChange={this.toggleIncludePost}
          />
        </div>
        <section className={classnames({ disabled: !includePost })}>
          <div className="second-row">
            Modify Channel Messages
          </div>
          <div className="third-row">
            Optionally, you can click on the icons below to set the default message for each channel
          </div>
          <div className="stream-row">
            { streams.map((s, index) => {
              const color = (includePost && streamIndex === index) ?
                streams[streamIndex].color : undefined;
              return (
                <i
                  key={index}
                  className={classnames(s.icon, { enabled: includePost })}
                  style={{ color }}
                  onClick={() => this.handleStreamClick(index)}
                />
              );
            })}
          </div>
          <div className="popup-wrapper">
            <PopupBorder
              left={0}
              top={16}
              arrowLeft={11 + (30 * streamIndex)}
              borderColor={streams[streamIndex].color}
            >
              <div className="message-wrapper">
                <MultiLineInput
                  disabled={!includePost}
                  highlightFocus={false}
                  message={message}
                  handleMessageChange={this.handleMessageChange}
                  onBlur={this.handleMessageSave}
                />
              </div>
            </PopupBorder>
          </div>
        </section>
      </Wrapper>
    );
  }
}

export default SharedStreamsComponent;
