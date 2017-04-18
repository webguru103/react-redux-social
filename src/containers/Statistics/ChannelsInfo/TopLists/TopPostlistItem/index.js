import React from 'react';

import ListWrapper from '../../Wrapper/ListWrapper';
import ImgWrapper from '../../Wrapper/ImgWrapper';
import TxtWrapper from '../../Wrapper/TxtWrapper';
import TableWrapper from '../../Wrapper/TableWrapper';

class TopPostListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getCreatedDate() {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let created = new Date(this.props.topTweet.timestamp);
        return month[created.getUTCMonth()] + " " + created.getUTCDate() + "-" + created.getUTCHours() + ":" + created.getUTCMinutes();
    }
    
    getPicture(content) {
        if (content.content) {
            return content.content.submittedImageUrl;
        } else {
            return;
        }
    }
    
    getNote(content) {
        if (content.content) {
            return content.content.title;
        } else {
            return "No title";
        }
    }
    
    getCurrentMonth() {
        let monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let date = new Date();
        return monthNumber[date.getUTCMonth()];
    }
    
    renderItem(topItem) {
        const content = topItem.updateContent.companyStatusUpdate.share;
        return (
            <div className={ [ 'col-md-7', 'col-lg-7', 'col-sm-7', 'col-xs-7'].join(' ') }>
                <div className={ [ 'col-md-2', 'col-sm-2', 'col-xs-2'].join(' ') }>
                    <ImgWrapper>
                        <img src={ this.getPicture(content) } />
                    </ImgWrapper>
                </div>
                <div className={ [ 'col-md-10', 'col-sm-10', 'col-xs-1'].join(' ') }>
                    <TxtWrapper>
                        <p><b>{ this.getCreatedDate() }</b></p>
                            <p>{ this.getNote(content) }</p>
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
                            <th className="borderRight" ><h3>{ this.props.likes }</h3>Likes</th>
                            <th className="borderRight" ><h3>{ this.props.comments }</h3>Comments</th>
                            <th><h3>{ this.props.posts }</h3>Posts</th>
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

TopPostListItem.propTypes = {
    children: React.PropTypes.node,
};

export default TopPostListItem;