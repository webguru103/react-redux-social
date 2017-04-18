import React from 'react';
import Loading from 'react-loading';

import Wrapper from './Wrapper';
import Progress from './Progress';

class ChannelLoading extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getType() {
        return this.props.channel.type.split('_')[1];
    }
    
    render() {
        
        return (
            <Wrapper>
                <div className="connectionBlock">
                    <div className= "connectionIcon">
                        <i className={ this.props.channel.channel_icon + ' ' + this.props.channel.channel }></i>
                    </div>
                    <div style={{ float: 'left' }}>
                        <div className="connectionName">
                            { this.props.channel.display_name }
                        </div>
                        <div className={ this.props.channel.channel }>
                            {this.getType()[0].toUpperCase() + this.getType().slice(1)}
                        </div>
                    </div>
                </div>
                <p>We are crunching the numbers!</p>
                <Progress>
                    <Loading type='spin' color='#ff0000' />
                </Progress>
            </Wrapper>
        );
    }
}
ChannelLoading.propTypes = {
    children: React.PropTypes.node
};
    
export default ChannelLoading;