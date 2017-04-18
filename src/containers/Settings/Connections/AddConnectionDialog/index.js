import React, { PropTypes } from 'react';
import { Tab, Tabs } from 'react-toolbox';

import PPFullScreenDialog from 'elements/atm.FullScreenDialog';
import TextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';

import styles from './styles.scss';
import tabTheme from './tabTheme.scss';
import ConnectionsListItem from '../ConnectionsList/ConnectionsListItem';

class AddConnectionDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      fixedIndex: 1,
      inverseIndex: 1,
      channel: '',
      futureChannels: [],
      wordpressUrl: '',
      wordpressUrlError: '',
      wordpressUserName: '',
      wordpressUserNameError: '',
      wordpressPassword: '',
      wordpressPasswordError: '',
    };

    this.connect = this.connect.bind(this);
    this.toggleConnection = this.toggleConnection.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.fetchBlogs = this.fetchBlogs.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.handleWordpressUrl = this.handleWordpressUrl.bind(this);
    this.handleWordpressUserName = this.handleWordpressUserName.bind(this);
    this.handleWordpressPassword = this.handleWordpressPassword.bind(this);
  }

  getChannelClass(connection) {
    return Object.prototype.hasOwnProperty.call(styles, connection.channel) ? styles[connection.channel] : '';
  }

  titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchBlogs() {
    this.clearErrors();
    if (!this.state.wordpressPassword) {
      this.setState({ wordpressPasswordError: 'This field is required' });
    }
    if (!this.state.wordpressUrl) {
      this.setState({ wordpressUrlError: 'This field is required' });
    }
    if (!this.state.wordpressUserName) {
      this.setState({ wordpressUserNameError: 'This field is required' });
    }

    if (this.checkErrors()) {
      const data = {
        payload: {
          url: this.state.wordpressUrl,
          username: this.state.wordpressUserName,
          password: this.state.wordpressPassword,
        },
      };

      this.props.getWordpressBlogs(data);
    }
  }

  clearErrors() {
    this.setState({
      wordpressPasswordError: '',
      wordpressUserNameError: '',
      wordpressUrlError: '',
    });
  }

  checkErrors() {
    if (this.state.wordpressPasswordError || this.state.wordpressUserNameError || this.state.wordpressUrlError) {
      return false;
    }

    return true;
  }

  initializeFutureChannels() {
    const futureChannels = [];
    if (this.props.subChannels.length) {
      for (let i = 0; i < this.props.subChannels.length; i += 1) {
        if (this.props.subChannels[i].status === 1) {
          futureChannels.push(this.props.subChannels[i]);
        }
      }
    }

    return futureChannels;
  }

  handleSave() {
    const data = {
      channel: this.state.channel,
      subChannels: this.state.futureChannels,
    };
    this.setState({ channel: '', futureChannels: [] });
    this.props.createSubChannels(data);
  }

  toggleConnection(connection) {
    const newFutureChannels = [];
    let found = false;
    if (!this.state.futureChannels.length) {
      newFutureChannels.push(connection);
      found = true;
    } else if (this.state.futureChannels.length) {
      for (let i = 0; i < this.state.futureChannels.length; i += 1) {
        if (this.state.futureChannels[i].id !== connection.connection_id) {
          newFutureChannels.push(this.state.futureChannels[i]);
        }
        if (this.state.futureChannels[i].id === connection.connection_id) {
          found = true;
        }
      }
    }
    if (!found) {
      newFutureChannels.push(connection);
    }
    this.setState({ futureChannels: newFutureChannels });
  }

  handleTabChange = (index) => {
    this.setState({ index });
  };

  handleFixedTabChange = (index) => {
    this.setState({ fixedIndex: index });
  };

  handleInverseTabChange = (index) => {
    this.setState({ inverseIndex: index });
  };

  handleWordpressUrl(event) {
    const regex = '/^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$/';
    if (event.target.value.match(regex) || event.target.value === '') {
      // console.log('match');
      // this.setState({ wordpressUrlError: '' });
    } else {
      // this.setState({ wordpressUrlError: 'Invalid URL' });
    }

    this.setState({ wordpressUrl: event.target.value });
  }

  handleWordpressUserName(event) {
    this.setState({ wordpressUserNameError: '' });
    this.setState({ wordpressUserName: event.target.value });
  }

  handleWordpressPassword(event) {
    this.setState({ wordpressPasswordError: '' });
    this.setState({ wordpressPassword: event.target.value });
  }

  connect = (url, channel, sub) => {
    this.setState({ channel });
    this.props.setSubCallback(sub);

    window.open(url);
  };

  renderContent() {
    const connectionTypes = [
      { name: 'Facebook Profile',
        icon: 'fa fa-facebook-square',
        text: 'Log into your Facebook to start sharing content',
        channel: 'facebook',
        sub: false,
        url: this.props.socialUrls ? this.props.socialUrls.facebook : '',
      },
      { name: 'Facebook Page',
        icon: 'fa fa-facebook-square',
        text: 'Log into your Facebook to start sharing content',
        channel: 'facebook',
        sub: true,
        url: this.props.socialUrls ? this.props.socialUrls.facebook_page : '',
      },
      { name: 'Twitter Profile',
        icon: 'fa fa-twitter-square',
        text: 'Log into your Twitter to start sharing content',
        channel: 'twitter',
        sub: false,
        url: this.props.socialUrls ? this.props.socialUrls.twitter : '',
      },
      { name: 'LinkedIn Profile',
        icon: 'fa fa-linkedin-square',
        text: 'Log into your LinkedIn to start sharing content',
        channel: 'linkedin',
        sub: false,
        url: this.props.socialUrls ? this.props.socialUrls.linkedin : '',
      },
      { name: 'LinkedIn Company',
        icon: 'fa fa-linkedin-square',
        text: 'Log into your LinkedIn to start sharing content',
        channel: 'linkedin',
        sub: true,
        url: this.props.socialUrls ? this.props.socialUrls.linkedin : '',
      },
      { name: 'Pinterest Board',
        icon: 'fa fa-pinterest-square',
        text: 'Log into your Pinterest to start sharing content',
        channel: 'pinterest',
        sub: true,
        url: this.props.socialUrls ? this.props.socialUrls.pinterest : '',
      },
    ];
    if (Object.getOwnPropertyNames(this.props.subChannel).length !== 0) {
      let subChannelType = 'Page';
      if (this.state.channel === 'pinterest') {
        subChannelType = 'Board';
      } else if (this.state.channel === 'linkedin') {
        subChannelType = 'Company';
      }
      let channelIcons = 'fa fa-facebook-square';
      if (this.state.channel === 'pinterest') {
        channelIcons = 'fa fa-pinterest-square';
      } else if (this.state.channel === 'linkedin') {
        channelIcons = 'fa fa-linkedin-square';
      } else if (this.state.channel === 'google') {
        channelIcons = 'fa fa-google-plus-square';
      } else if (this.state.channel === 'twitter') {
        channelIcons = 'fa fa-twitter-square';
      }

      return (
        <div>
          <div>
            <h1 style={{ fontSize: '48px' }}>
              <i className={[channelIcons, styles.icon, this.state.channel].join(' ')} />
              {`${this.titleCase(this.state.channel)} ${subChannelType}`}
            </h1>
            <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
          </div>
          <div>
            <hr />
            { !this.props.subChannels &&
              <p>There are no associated { subChannelType } with this account.</p>
            }
            { this.props.subChannels.connected && this.props.subChannels.connected.map((channel, i) =>
              <ConnectionsListItem key={i} connectionIcons={channelIcons} connection={channel} hidden={channel.status === '1' ? true : false} subChannel channelType={`${channel.channel} ${subChannelType}`} toggleConnection={this.toggleConnection} /> // eslint-disable-line no-unneeded-ternary
              )
            }
            { this.props.subChannels.available && this.props.subChannels.available.map((channel, i) =>
              <ConnectionsListItem key={i} connectionIcons={channelIcons} connection={channel} subChannel hidden={channel.status === '1' ? true : false} connected={false} channelType={`${channel.channel} ${subChannelType}`} toggleConnection={this.toggleConnection} /> // eslint-disable-line no-unneeded-ternary
              )
            }
          </div>
        </div>
      );
    }

    return (
      <Tabs index={this.state.index} onChange={this.handleTabChange}>
        <Tab label="Social Media" theme={tabTheme}>
          <div className={styles.tabContent}>
            <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
            <hr />
            <div>
              { connectionTypes.map((connection, i) =>
                <div key={i} className={styles.connectionTypeContainer}><i className={[connection.icon, styles.icon, this.getChannelClass(connection, styles)].join(' ')} /><div className={styles.connectionType}><div className={styles.connectionName}>{ connection.name }</div><div className={styles.connectionDesc}>{ connection.text }</div></div><div className={styles.buttonContainer}><PPButton label="Connect" neutral onClick={() => this.connect(connection.url, connection.channel, connection.sub)} /></div></div>
                      )}
            </div>
          </div>
        </Tab>
        <Tab label="Wordpress" theme={tabTheme}>
          <div className={styles.tabContent}>

            { this.props.subChannels.length === 0 &&
              <div>
                <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
                <hr />
                <div>
                  <TextField floatingLabelText="Wordpress URL" errorText={this.state.wordpressUrlError} name="wordpressUrl" type="url" value={this.state.wordpressUrl} onChange={this.handleWordpressUrl} />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <TextField floatingLabelText="Wordpress Username" errorText={this.state.wordpressUserNameError} name="wordpressUsername" type="text" value={this.state.wordpressUserName} onChange={this.handleWordpressUserName} />
                  </div>
                  <div className="col-md-6">
                    <TextField floatingLabelText="Wordpress Password" errorText={this.state.wordpressPasswordError} name="wordpressPassword" type="password" value={this.state.wordpressPassword} onChange={this.handleWordpressPassword} />
                  </div>
                </div>
                <PPButton label="Fetch Blogs" primary={!this.state.wordpressPasswordError || !this.state.wordpressUrlError || !this.state.wordpressUserNameError} disabled={!this.state.wordpressPasswordError || !this.state.wordpressUrlError || !this.state.wordpressUserNameError} onClick={this.fetchBlogs} />
                <hr />
              </div>
              }
            { this.props.subChannels.length > 0 && this.props.subChannels.map((channel, i) =>
              <ConnectionsListItem key={i} connection={channel} hidden={false} subChannel toggleConnection={this.toggleConnection} />
              )}
          </div>

        </Tab>
      </Tabs>
    );
  }

  render() {
    const labelActions = [
            { label: 'Cancel', onClick: this.props.handleDialogToggle, className: styles.cancelButton },
            { label: 'Submit', onClick: this.handleSave, className: styles.submitButton },
    ];

    return (
      <PPFullScreenDialog title="Connect a Channel" active={this.props.dialogShown} actions={labelActions}>
        { this.renderContent() }
      </PPFullScreenDialog>
    );
  }
}

AddConnectionDialog.propTypes = {
  socialUrls: PropTypes.object,
  dialogShown: PropTypes.bool,
  handleDialogToggle: PropTypes.func,
  getWordpressBlogs: PropTypes.func,
  subChannels: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  setSubCallback: PropTypes.func,
  subChannel: PropTypes.object,
  createSubChannels: PropTypes.func,
};

export default AddConnectionDialog;
