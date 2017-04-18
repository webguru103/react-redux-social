import React from 'react';
import { connect } from 'react-redux';

import PPButton from 'elements/atm.Button';
import MenuItem from 'material-ui/MenuItem';
import PPSelectField from 'elements/atm.SelectField';
import PPButtonInput from 'elements/atm.ButtonInput';

const styles = require('./styles.scss');

class ConnectionsControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.setChannelFilter = this.setChannelFilter.bind(this);
    this.setChannelType = this.setChannelType.bind(this);
  }

  setChannelFilter(e) {
    this.props.setChannelFilter(e);
  }

  setChannelType(event, index, value) {
    this.props.setChannelType(value);
  }

  render() {
    const channelTypes = [<MenuItem value="" primaryText="All Types" key="" />];
    this.props.channels.forEach((channel) => {
      channelTypes.push(<MenuItem value={channel} primaryText={channel} key={channel} />);
    });

    return (
      <div className={['row', styles.mainBlock].join(' ')}>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', styles.noLeftPadding].join(' ')}
        >
          <h3 className={[styles.noMargin, styles.verticalAlign].join(' ')}>Connected Accounts</h3>
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', styles.noLeftPadding, styles.verticalAlign].join(' ')}
        >
          <PPButton label="Connect a New Channel" primary onClick={this.props.handleDialogToggle} />
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-3', styles.noLeftPadding].join(' ')}
        >
          <div className={[styles.filterBlock, styles.channelTypeBlock].join(' ')}>
            <PPSelectField onChange={this.setChannelType} value={this.props.channelType} underlineShow={false}>
              { channelTypes }
            </PPSelectField>
          </div>
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-3', styles.noLeftPadding].join(' ')}
        >
          <PPButtonInput
            value={this.props.channelFilter} type="text" hint="Search" icon="search"
            onChange={this.setChannelFilter}
          />
        </div>
      </div>
    );
  }
}

ConnectionsControlBar.propTypes = {
  setChannelFilter: React.PropTypes.func,
  setChannelType: React.PropTypes.func,
  channels: React.PropTypes.array,
  handleDialogToggle: React.PropTypes.func,
  channelFilter: React.PropTypes.string,
  channelType: React.PropTypes.string,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, null)(ConnectionsControlBar);
