import React, { PropTypes } from 'react';
import Loading from 'react-loading';

import Wrapper from './Wrapper';
import Progress from './Progress';

class ChannelLoading extends React.Component {

  static propTypes = {
    channel: PropTypes.shape({
      type: PropTypes.string,
      channel_icon: PropTypes.string,
      channel: PropTypes.string,
    }).isRequired,
  }

  getType() {
    return this.props.channel.type.split('_')[1];
  }

  render() {
    const { channel } = this.props;
    return (
      <Wrapper>
        <div className="connectionBlockLoading">
          <div className="connectionIcon">
            <i className={`${channel.channel_icon} ${channel.channel}`}></i>
          </div>
          <div className="connectionContent">
            <div className="connectionName">
              {channel.display_name}
            </div>
            <div className={channel.channel}>
              {this.getType()[0].toUpperCase() + this.getType().slice(1)}
            </div>
          </div>
        </div>
        <p className="crunchingNumber">We are crunching the numbers!</p>
        <Progress>
          <Loading type="spin" color="#E81C64" width={60} height={60} delay={0} />
        </Progress>
      </Wrapper>
    );
  }
}

export default ChannelLoading;
