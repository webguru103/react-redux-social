import React from 'react';

import ListWrapper from '../../Wrapper/ListWrapper';
import ImgWrapper from '../../Wrapper/ImgWrapper';
import TxtWrapper from '../../Wrapper/TxtWrapper';
import TableWrapper from '../../Wrapper/TableWrapper';

class TopTweetListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getCreatedDate() {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let created = new Date(this.props.topTweet.created_at);
        return month[created.getUTCMonth()] + " " + created.getUTCDate() + "-" + created.getUTCHours() + ":" + created.getUTCMinutes();
    }
    
    getCurrentMonth() {
        let monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let date = new Date();
        return monthNumber[date.getUTCMonth()];
    }
    
    renderItem(topItem) {
        return (
            <div className={ [ 'col-md-7', 'col-lg-7', 'col-sm-7', 'col-xs-7'].join(' ') }>
                <div className={ [ 'col-md-2', 'col-sm-2', 'col-xs-2'].join(' ') }>
                    <ImgWrapper>
                        <img src={ topItem.user.profile_image_url } />
                    </ImgWrapper>
                </div>
                <div className={ [ 'col-md-10', 'col-sm-10', 'col-xs-1'].join(' ') }>
                    <TxtWrapper>
                        <p><b>{ this.getCreatedDate() }</b></p>
                            <p>{ topItem.text }</p>
                    </TxtWrapper>
                </div>
            </div>
                    
        );
    }
    
    renderItemInfo() {
        return (
            <div className={ [ 'col-md-5', 'col-lg-5', 'col-sm-5', 'col-xs-5'].join(' ') }>
                <TableWrapper>
                    <table>
                        <tbody className="lsitItem" >
                            <th className="borderRight" ><h3>{ this.props.tweets }</h3>Tweets</th>
                            <th className="borderRight" ><h3>{ this.props.favorites }</h3>Favorites</th>
                            <th><h3>{ this.props.retweets }</h3>Retweets</th>
                        </tbody>
                    </table>
                </TableWrapper>
            </div>
        );
    }
    
    render() {
        const topItem = this.props.topTweet;
        if (topItem.month == this.getCurrentMonth()) {
            return (
                <ListWrapper>
                    { this.renderItem(topItem) }
                    { this.renderItemInfo() }
                </ListWrapper>
            );
        } else {
            return (
                <div>
                    PowerPost App Development
                </div>
            );
        }
    }
}

TopTweetListItem.propTypes = {
    children: React.PropTypes.node,
};
export default TopTweetListItem;