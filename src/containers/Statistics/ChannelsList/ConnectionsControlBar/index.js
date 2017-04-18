import React from 'react';
import {connect} from 'react-redux';

import PPButtonInput from 'elements/atm.ButtonInput';
import Wrapper from './Wrapper';

class ConnectionsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setChannelFilter = this.setChannelFilter.bind(this);
    }

    setChannelFilter(e) {
        this.props.setChannelFilter(e);
    }

    render() {
        return (
            <Wrapper>
                <div className={ ['col-xs-12', 'col-sm-12', 'col-md-12', 'noLeftPadding'].join(' ') }>
                        <PPButtonInput 
                            value={ this.props.channelFilter }
                            type="text"
                            hint="Search Channel"
                            icon="search"
                            onChange={ this.setChannelFilter }
                        />
                </div>
            </Wrapper>
        );
    }
}

ConnectionsControlBar.propTypes = {
    children: React.PropTypes.node,
};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(ConnectionsControlBar);
