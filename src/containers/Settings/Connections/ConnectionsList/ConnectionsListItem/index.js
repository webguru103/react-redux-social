import React from 'react';
import FontIcon from 'elements/atm.FontIcon';
import PPButton from 'elements/atm.Button';

const styles = require('./styles.scss');

class ConnectionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: this.props.primary,
    };

    this.remove = this.remove.bind(this);
  }

  getChannelClass(stylesObject) {
    return Object.prototype.hasOwnProperty.call(stylesObject, this.props.connection.channel) ? stylesObject[this.props.connection.channel] : '';
  }

  getType() {
    return this.props.channelType ? this.props.channelType : this.props.connection.type.split('_')[1];
  }

  getStatusLabel(stylesObject) {
    switch (this.props.connection.status) {
      case '3': return <div className={stylesObject.disconnectedLabel}><i className="fa fa-warning"></i> Reconnect</div>;
      default: return <div></div>;
    }
  }

  remove() {
    this.props.remove(this.props.connection.connection_id);
  }

  toggleConnection(connection) {
    this.setState({ primary: !this.state.primary });
    this.props.toggleConnection(connection);
  }

  render() {
    if (this.props.connectionIcons) {
      this.props.connection.channel_icon = this.props.connectionIcons;
    }
    return (
      <div>
        {!this.props.hidden &&
        <div className={styles.connectionBlock}>
          <div>
            <div className={styles.connectionIcon}>
              <i className={`${this.props.connection.channel_icon} ${this.getChannelClass(styles)}`}></i>
            </div>
            <div style={{ float: 'left' }}>
              <div className={styles.connectionName}>{ this.props.connection.display_name || this.props.connection.blogName }</div>
              {!this.props.connection.blogName &&
              <div className={this.getChannelClass(styles)}>{this.getType()[0].toUpperCase() + this.getType().slice(1)}</div>
            }
            </div>
            {!this.props.subChannel &&
            <div>
              <button className={[styles.controlBlock, styles.removeBlock].join(' ')} onClick={this.remove}>
                <div><FontIcon value="clear"></FontIcon></div>
                <div>Remove</div>
              </button>
              <div className={styles.controlBlock}>
                {this.getStatusLabel(styles)}
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          }
            {this.props.subChannel &&
            <div>
              <div className={styles.controlBlock}>
                <PPButton label="Enable" primary={this.state.primary} onClick={() => this.toggleConnection(this.props.connection)} />
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          }
          </div>
        </div>
      }
      </div>
    );
  }
}

ConnectionsListItem.propTypes = {
  primary: React.PropTypes.bool,
  connection: React.PropTypes.object,
  remove: React.PropTypes.func,
  subChannel: React.PropTypes.bool,
  channelType: React.PropTypes.string,
  toggleConnection: React.PropTypes.func,
  connectionIcons: React.PropTypes.string,
  hidden: React.PropTypes.bool,
};

export default ConnectionsListItem;
