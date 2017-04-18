import React from 'react';
import {
    BarChart,
    Bar, 
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
    makeSelectCurrentChannel,
} from '../selectors';

import TopTweetListItem from '../TopLists/TopTweetlistItem';
import TopFaceListItem from '../TopLists/TopFacelistItem';
import TopPinListItem from '../TopLists/TopPinlistItem';
import TopPostListItem from '../TopLists/TopPostlistItem';

import Info from '../Wrapper/Info';
import Wrapper from '../Wrapper/Wrapper';

class ReTweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { channel: undefined };
    }
    
    componentWillMount() {
        let channel;
        channel = this.props.activeChannel;
        this.setState({ channel });
    }
    
    getTotaldata() {
        let total, totalInfo, keys, last, contents;
        let tweet, content;
        switch(this.state.channel.connection.channel){
            case 'pinterest':
                totalInfo = this.state.channel.analytics.pins_by_weeks_ago;
                keys = Object.keys(totalInfo);
                last = keys[0];
                if( last != null ) {
                    total = totalInfo[last].repins != null ? totalInfo[last].repins : '0';
                    tweet = totalInfo[last].pin_count + " Pins";
                    contents = total + " Repins";
                    content = "Repins";
                }
                break;
            case 'twitter':
                totalInfo = this.state.channel.analytics.tweets_by_weeks_ago;
                keys = Object.keys(totalInfo);
                last = keys[0];
                if( last != null ) {
                    total = totalInfo[last].retweet_count != null ? totalInfo[last].retweet_count : '0';
                    tweet = totalInfo[last].tweet_count + " Tweets";
                    contents = total + " Retweets";
                    content = "Retweets";
                }
                break;
            case 'facebook':
                totalInfo = this.state.channel.analytics.extended.page_fans_by_weeks_ago;
                keys = Object.keys(totalInfo);
                last = keys[0];
                if( last != null ) {
                    total = totalInfo[last] != null ? totalInfo[last] : '0';
                    tweet = "2 Likes";
                    contents = total + " Posts";
                    content = "Posts";
                }
                break;
            case 'linkedin':
                totalInfo = this.state.channel.analytics.total_followers_by_weeks_ago;
                keys = Object.keys(totalInfo);
                last = keys[0];
                if( last != null ) {
                    total = totalInfo[last] != null ? totalInfo[last] : '0';
                    tweet = "3 Likes";
                    contents = total + " Posts";
                    content = "Posts";
                }
                break;
            default:
                break;
        }
        return (
            <div>
                <h1><b>{ total }</b></h1>
                <h5>{ content } this week</h5><br/>
                <h5>Based on { tweet } sent in the last week you averaged <b>{ contents } </b>per post.</h5>
            </div>
        );
    }
    
    getNameDate(date) {
        let d = new Date(date);
        return (d.getMonth()+1) + "/" + d.getDate();
    }
    
    getChartsData() {
        let data = [];
        let temp = {};
        var i;
        switch(this.state.channel.connection.channel) {
            case 'pinterest':
                const pinterest = this.state.channel.analytics.pins_by_weeks_ago;
                for(i in pinterest) {
                    temp = { name: this.getNameDate(pinterest[i].top_pins_by_engagement["0"].created_at), repins: pinterest[i].repins, amt: pinterest[i].repins };
                    data.push(temp);
                }
                break;
            case 'twitter':
                const twitter = this.state.channel.analytics.tweets_by_weeks_ago;
                for(i in twitter) {
                    temp = { name: this.getNameDate(twitter[i].top_tweets_by_engagement["0"].created_at), repins: twitter[i].retweet_count, amt: twitter[i].retweet_count };
                    data.push(temp);
                }
                break;
            case 'facebook':
                const facebook = this.state.channel.analytics.posts_by_weeks_ago;
                for(i in facebook) {
                    temp = { name: this.getNameDate(facebook[i].top_posts_by_engagement["0"].created_time), repins: facebook[i].post_count, amt: facebook[i].post_count };
                    data.push(temp);
                }
                break;
            case 'linkedin':
                const linkedin = this.state.channel.analytics.posts_by_weeks_ago;
                for(i in linkedin) {
                    temp = { name: this.getNameDate(linkedin[i].top_posts_by_engagement["0"].timestamp), repins: linkedin[i].post_count, amt: linkedin[i].post_count };
                    data.push(temp);
                }
                break;
            default:
                break;
        }
        return data;
    }
    
    render() {
        const channelInfo = this.state.channel.analytics;
        let keys;
        let last;
        let TopTweetsList;
        if(channelInfo != undefined) {
            TopTweetsList = [];
            switch(this.state.channel.connection.channel){
                case 'pinterest':
                    keys = Object.keys(channelInfo.pins_by_month);
                    last = keys[0];
                    if( last != null ) {
                        channelInfo.pins_by_month[last].top_pins_by_engagement.map((topPin, index) => {
                            TopTweetsList.push(
                                <TopPinListItem topTweet={topPin} key={ this.props.params.channel_id - index - 1200 + 'bc' } likes={ channelInfo.pins_by_month[last].likes } comments={ channelInfo.pins_by_month[last].comments }
                                repins={ channelInfo.pins_by_month[last].repins } />
                            );
                        });
                    } else {
                        TopTweetsList = "You Currently have no Posts.";
                    }
                    break;
                case 'twitter':
                    keys = Object.keys(channelInfo.tweets_by_month);
                    last = keys[0];
                    if( last != null ) {
                        channelInfo.tweets_by_month[last].top_tweets_by_engagement.map((topTweet, index) => {
                            TopTweetsList.push(
                                <TopTweetListItem topTweet={topTweet} key={ this.props.params.channel_id - index - 1200 + 'bc' } tweets={ channelInfo.tweets_by_month[last].tweet_count }
                                favorites={ channelInfo.tweets_by_month[last].favorite_count } retweets={ channelInfo.tweets_by_month[last].retweet_count } />
                            );
                        });
                    } else {
                        TopTweetsList = "You Currently have no Posts.";
                    }
                    break;
                case 'linkedin':
                    keys = Object.keys(channelInfo.posts_by_month);
                    last = keys[0];
                    if( last != null ) {
                        channelInfo.posts_by_month[last].top_posts_by_engagement.map((topPost, index) => {
                            TopTweetsList.push(
                                <TopPostListItem topTweet={topPost} key={ this.props.params.channel_id - index - 1200 + 'bc' } likes={ channelInfo.posts_by_month[last].likes }
                                comments={ channelInfo.posts_by_month[last].comments } posts={ channelInfo.posts_by_month[last].post_count } />
                            );
                        });
                    } else {
                        TopTweetsList = "You Currently have no Posts.";
                    }
                    break;
                case 'facebook':
                    keys = Object.keys(channelInfo.posts_by_month);
                    last = keys[0];
                    if( last != null ) {
                        channelInfo.posts_by_month[last].top_posts_by_engagement.map((topPost, index) => {
                            TopTweetsList.push(
                                <TopFaceListItem topTweet={topPost} key={ this.props.params.channel_id - index - 1200 + 'bc' } likes={ channelInfo.posts_by_month[last].likes }
                                comments={ channelInfo.posts_by_month[last].comments } posts={ channelInfo.posts_by_month[last].post_count } />
                            );
                        });
                    } else {
                        TopTweetsList = "You Currently have no Posts.";
                    }
                    break;
                default:
                    TopTweetsList = "You Currently have no Channels.";
                    break;
            }
        }
        
        return (
            <Info>
                <Wrapper>
                    <div className={['col-md-4', 'col-sm-4', 'col-xs-4'].join(' ')}>
                        { this.getTotaldata() }
                    </div>
                    <div className={['col-md-8', 'col-sm-8', 'col-xs-8'].join(' ')}>
                        <BarChart width={600} height={200} data={ this.getChartsData() } margin={{top: 5, right: 30, left: 20, bottom: 1}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Bar dataKey="repins" fill="#dfdfdf" />
                        </BarChart>
                    </div>
                </Wrapper>
                <div>
                    <h3>Top This Month</h3>
                    { TopTweetsList }
                </div>
            </Info>
        );
    }
}

ReTweets.propTypes = {
    children: React.PropTypes.node
};

const mapStateToProps = createStructuredSelector({
    activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps)(ReTweets));