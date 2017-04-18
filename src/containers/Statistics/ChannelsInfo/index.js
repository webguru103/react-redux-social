import React from 'react';
import TabLink from 'elements/atm.TabLink';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    makeSelectCurrentChannel,
    makeLodingChannel,
} from './selectors';

import {
    fetchCurrentChannel,
    fetchCurrentChannelSuccess,
} from './actions';

import ChannelLoading from '../Loading';

import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';

import SubWrapper from './SubWrapper';
import MainWrapper from './MainWrapper';
import TabButton from './Wrapper/TabButton';

class ChannelsInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.activeChannel != this.props.activeChannel) {
            this.props.fetchChannelInfo(nextProps.activeChannel);
        }
    }
    
    componentDidMount() {
        console.log(" channel_id : " + this.props.params.channel_id);
        this.props.fetchChannel(this.props.params.channel_id);
    }
    
    getType(channel) {
        return channel.type.split('_')[1];
    }
    
    setTweetsInfo() {
        let keys;
        let last;
        switch(this.props.activeChannel.connection.channel){
            case 'pinterest':
                const channelInfo = this.props.activeChannel.analytics.pins_by_month;
                keys = Object.keys(channelInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ channelInfo[last].likes }</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                }
            case 'twitter':
                return (
                    <div>
                        <h4>{ this.props.activeChannel.analytics.user_stats.listed_count }</h4>
                        <h5>Tweets</h5>
                    </div>
                );
            case 'linkedin':
                const linkedInfo = this.props.activeChannel.analytics.posts_by_month;
                keys = Object.keys(linkedInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ linkedInfo[last].likes }</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                }
            case 'facebook':
                const facebookInfo = this.props.activeChannel.analytics.posts_by_month;
                keys = Object.keys(facebookInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ facebookInfo[last].likes }</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Likes</h5>
                        </div>
                    );
                }
            default:
                return;
        }
    }
    
    setFollowersInfo() {
        let keys;
        let last;
        switch(this.props.activeChannel.connection.channel){
            case 'pinterest':
                const channelInfo = this.props.activeChannel.analytics.pins_by_month;
                keys = Object.keys(channelInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ channelInfo[last].comments }</h4>
                            <h5>Followers</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Followers</h5>
                        </div>
                    );
                }
            case 'twitter':
                return (
                    <div>
                        <h4>{ this.props.activeChannel.analytics.user_stats.followers_count }</h4>
                        <h5>Followers</h5>
                    </div>
                );
            case 'linkedin':
                const linkedInfo = this.props.activeChannel.analytics.total_followers_by_month;
                keys = Object.keys(linkedInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ linkedInfo[last] }</h4>
                            <h5>Followers</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Followers</h5>
                        </div>
                    );
                }
            case 'facebook':
                const facebookInfo = this.props.activeChannel.analytics.extended.page_fans_by_month;
                keys = Object.keys(facebookInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ facebookInfo[last] }</h4>
                            <h5>Fans</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Fans</h5>
                        </div>
                    );
                }
            default:
                return;
        }
    }
    
    setFollowingInfo() {
        let keys;
        let last;
        switch(this.props.activeChannel.connection.channel){
            case 'pinterest':
                const channelInfo = this.props.activeChannel.analytics.pins_by_month;
                keys = Object.keys(channelInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ channelInfo[last].repins }</h4>
                            <h5>Repins</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                        <h4>0</h4>
                        <h5>Repins</h5>
                    </div>);
                }
            case 'twitter':
                return (
                    <div>
                        <h4>{ this.props.activeChannel.analytics.user_stats.friends_count }</h4>
                        <h5>Following</h5>
                    </div>
                );
            case 'linkedin':
                const linkedInfo = this.props.activeChannel.analytics.posts_by_month;
                keys = Object.keys(linkedInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ linkedInfo[last].comments }</h4>
                            <h5>Following</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Following</h5>
                        </div>
                    );
                }
            case 'facebook':
                const facebookInfo = this.props.activeChannel.analytics.posts_by_month;
                keys = Object.keys(facebookInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <div>
                            <h4>{ facebookInfo[last].comments }</h4>
                            <h5>Following</h5>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h4>0</h4>
                            <h5>Following</h5>
                        </div>
                    );
                }
            default:
                return;
        }
    }
    
    setFavoritesInfo() {
        let keys;
        let last;
        switch(this.props.activeChannel.connection.channel){
            case 'pinterest':
                const channelInfo = this.props.activeChannel.analytics.pins_by_month;
                keys = Object.keys(channelInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <th className="infoWidth" >
                            <h4>{ channelInfo[last].pin_count }</h4>
                            <h5>Pins</h5>
                        </th>
                    );
                } else {
                    return (
                        <th className="infoWidth" >
                            <h4>0</h4>
                            <h5>Pins</h5>
                        </th>
                    );
                }
            case 'twitter':
                return (
                    <th className="infoWidth" >
                        <h4>{ this.props.activeChannel.analytics.user_stats.favourites_count }</h4>
                        <h5>Favorites</h5>
                    </th>
                );
            case 'linkedin':
                const linkedInfo = this.props.activeChannel.analytics.total_followers_by_month;
                keys = Object.keys(linkedInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <th className="infoWidth" >
                            <h4>{ linkedInfo[last].post_count }</h4>
                            <h5>Posts</h5>
                        </th>
                    );
                } else {
                    return (
                        <th className="infoWidth" >
                            <h4>0</h4>
                            <h5>Posts</h5>
                        </th>
                    );
                }
            case 'facebook':
                const facebookInfo = this.props.activeChannel.analytics.posts_by_month;
                keys = Object.keys(facebookInfo);
                last = keys[0];
                if (last != null) {
                    return (
                        <th className="infoWidth" >
                            <h4>{ facebookInfo[last].post_count }</h4>
                            <h5>Posts</h5>
                        </th>
                    );
                } else {
                    return (
                        <th className="infoWidth" >
                            <h4>0</h4>
                            <h5>Posts</h5>
                        </th>
                    );
                }
            default:
                return;
        }
    }
    
    renderLoading (channel) {
        return (
            <div>
                <ChannelLoading channel={ channel } />
            </div>
        );
    }
    
    renderMain (channel) {
        return (
            <div>
                <div className="basicInfo" >
                    <table className="tablewidth" >
                        <tbody>
                            <th className={ ['borderright', 'activeWidth'].join(' ') } >
                                <div className="connectionBlock" >
                                    <div className= "connectionIcon">
                                        <i className={ channel.channel_icon + ' ' + channel.channel }></i>
                                    </div>
                                    <div style={{ float: 'left' }}>
                                        <div className="connectionName">
                                            { channel.display_name }
                                        </div>
                                        <div className={ channel }>
                                            { this.getType(channel)[0].toUpperCase() + this.getType(channel).slice(1) }
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th className={ ['borderright', 'infoWidth'].join(' ') } >{ this.setTweetsInfo() }</th>
                            <th className={ ['borderright', 'infoWidth'].join(' ') } >{ this.setFollowersInfo() }</th>
                            <th className={ ['borderright', 'infoWidth'].join(' ') } >{ this.setFollowingInfo() }</th>
                            { this.setFavoritesInfo() }
                        </tbody>
                    </table>
                </div>
                <div className="channelsinfo" >
                    <h3 className="paddingleft" >Engagement</h3>
                    <div className="infoTab" >
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/tweets' } label="Tweets" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/retweets'} label="Retweets" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/favorites' } label="Favorites" />
                        <SubWrapper>
                            <TabButton>Weekly</TabButton>
                            <TabButton>Monthly</TabButton>
                        </SubWrapper>
                    </div>
                    <div styles="mainInfo" >
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        let channel;
        this.props.connections.map((connection, index) => {
            if(connection.connection_id == this.props.params.channel_id) {
               channel = connection;
            }
        });
        if(this.props.isLoading == true) {
            return (
                <MainWrapper>
                    { this.renderLoading( channel ) }
                </MainWrapper>
            );
        } else {
            return (
                <MainWrapper>
                    { this.renderMain( channel ) }
                </MainWrapper>
            );
        }
    }
}
ChannelsInfo.propTypes = {
    children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    fetchChannel: (channelId) => dispatch(fetchCurrentChannel(channelId)),
    fetchChannelInfo: (channel) => dispatch(fetchCurrentChannelSuccess(channel)),
  };
}

const mapStateToProps = createStructuredSelector({
    activeChannel: makeSelectCurrentChannel(),
    isLoading: makeLodingChannel(),
    connections: makeSelectAccountConnections(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(ChannelsInfo));