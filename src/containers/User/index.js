/*
 * User View
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filepicker from 'filepicker-js';
import Avatar from 'elements/atm.Avatar';
import FlatButton from 'material-ui/FlatButton';
import PPTextField from 'elements/atm.TextField';
import PPRaisedButton from 'elements/atm.RaisedButton';
import {
  RadioGroup,
  RadioButton,
} from 'react-toolbox/lib/radio';

import { updateRequest } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';
import styles from './styles.scss';

class settingsUser extends Component {
  static propTypes = {
    user: PropTypes.object,
    userOwnAccount: PropTypes.object,
    filePickerKey: PropTypes.string,
    update: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.profileUpdate = this.profileUpdate.bind(this);
    this.passwordUpdate = this.passwordUpdate.bind(this);
    this.onRadioNotify = this.onRadioNotify.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const user = this.props.user || null;
    const userProperties = (user && user.properties) || null;
    const userOwnAccount = this.props.userOwnAccount || null;
    const userOwnAccountProperties = (userOwnAccount && userOwnAccount.properties) || null;

    this.state = {
      avatar: (userProperties && userProperties.thumb_url) || '',
      avatarKey: '',
      email: user.email || '',
      name: user.display_name || '',

      dailySnapshot: (userProperties && userProperties.daily_snapshot) || false,
      emailNotifications: (userProperties && userProperties.receive_notifications) || 'none',

      title: (userOwnAccount && userOwnAccount.title) || '',
      phoneNumber: (userOwnAccountProperties && userOwnAccountProperties.phone_number) || '',

      newPW: '',
      confirmNewPW: '',
      confirmPWError: '',
    };
  }

  onRadioNotify(value) {
    this.setState({
      emailNotifications: value,
    });
  }

  openFilePicker() {
    this.setState({
      open: false,
    });

    const tthis = this;
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      cropRatio: 1 / 1,
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'WEBCAM', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };

    const fileStoreOptions = {
      location: 'S3',
    };

    const uploadSuccess = function (Blobs) {
      tthis.setState({
        avatar: Blobs[0].url,
        avatarKey: Blobs[0].key,
      });
    };

    const uploadFail = function () {
      tthis.setState({
        avatarKey: '',
      });
    };

    const uploadProgress = function (progress) {
      console.log(JSON.stringify(progress));
    };

    filepicker.pickAndStore(
      filePickerOptions,
      fileStoreOptions,
      uploadSuccess,
      uploadFail,
      uploadProgress,
    );
  }

  profileUpdate(event) {
    event.preventDefault();

    const data = {
      avatarKey: this.state.avatarKey,
      name: this.state.name,
      title: this.state.title,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      emailNotifications: this.state.emailNotifications,
      newPW: '*****',
      accountID: this.props.userOwnAccount.account_id,
    };

    this.props.update(data);
  }

  passwordUpdate(event) {
    event.preventDefault();

    if (this.state.newPW !== this.state.confirmNewPW) {
      this.setState({
        confirmPWError: 'Password does not match the confirm password.',
      });
    } else if (this.state.confirmNewPW.length >= 6 && this.state.confirmNewPW.length <= 45) {
      this.setState({
        confirmPWError: '',
      });
      const data = {
        accountID: this.props.userOwnAccount.account_id,
        newPW: this.state.newPW,
      };
      this.props.update(data);
    } else {
      this.setState({
        confirmPWError: 'Password must be between 6 and 45 characters',
      });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const inline = {
      avatar: {
        position: 'relative',
        top: '-25px',
      },
      avatarImg: {
        left: '0px',
        width: '180px',
        height: '180px',
        borderRadius: '0',
      },
    };

    return (
      <div className="container" style={styles}>
        <form onSubmit={this.profileUpdate}>
          <row>
            <div className="col-md-12">
              <h3>Profile</h3>
            </div>
          </row>
          <row>
            <div className="col-md-3">
              <h5 style={{ marginLeft: '0px', color: '#9d9d9d' }}>Profile Picture</h5>
              <br />
              <div style={inline.avatar}>
                <Avatar
                  image={this.state.avatar}
                  style={inline.avatarImg}
                  theme={styles}
                  onClick={this.openFilePicker}
                />
                <FlatButton
                  label="Update Photo"
                  className={styles.updateAvatar}
                  onClick={this.openFilePicker}
                />
              </div>
            </div>
            <div className="col-md-9">
              <row>
                <div className="col-md-6">
                  <PPTextField
                    type="text"
                    name="name"
                    floatingLabelText="Name"
                    maxLength={200}
                    value={this.state.name}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                    required
                  />
                  <br />
                  <PPTextField
                    type="text"
                    name="title"
                    floatingLabelText="Title"
                    maxLength={100}
                    value={this.state.title}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                  />
                </div>
                <div className="col-md-6">
                  <PPTextField
                    type="email"
                    name="email"
                    floatingLabelText="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                  />
                  <br />
                  <PPTextField
                    type="tel"
                    name="phoneNumber"
                    floatingLabelText="Phone"
                    maxLength={100}
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                  />
                </div>
              </row>
            </div>
          </row>
          <row>
            <div className="col-md-12">
              <hr />
            </div>
          </row>
          <row>
            <div className="col-md-12">
              <h3>Email Notifications</h3>
            </div>
          </row>
          <row>
            <div className="col-md-3">
              <h4>Frequency</h4>
              <p>Send me email notifications:</p>
            </div>
            <div className="col-md-9">
              <RadioGroup name="digest" onChange={this.onRadioNotify} value={this.state.emailNotifications}>
                <RadioButton
                  theme={styles}
                  className={styles.radioButton}
                  value="none"
                  label="None"
                />
                <RadioButton
                  theme={styles}
                  className={styles.radioButton}
                  value="hourly_digest"
                  label="Hourly"
                />
                <RadioButton
                  theme={styles}
                  className={styles.radioButton}
                  value="daily_digest"
                  label="Daily"
                />
              </RadioGroup>
            </div>
          </row>
          <row>
            <div className="col-md-12">
              <PPRaisedButton
                type="submit"
                label="Save"
                primary={!false}
                className={styles.submit}
              />
            </div>
          </row>
        </form>
        <form onSubmit={this.passwordUpdate}>
          <row>
            <div className="col-md-12">
              <hr />
            </div>
          </row>
          <row>
            <div className="col-md-3">
              <h3>Security</h3>
            </div>
            <div className="col-md-9">
              <row>
                <div className="col-md-6">
                  <PPTextField
                    type="password"
                    name="newPW"
                    floatingLabelText="New Password"
                    maxLength={45}
                    value={this.state.newPW}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                  />
                </div>
                <div className="col-md-6">
                  <PPTextField
                    type="password"
                    name="confirmNewPW"
                    floatingLabelText="Confirm New Password"
                    maxLength={45}
                    value={this.state.confirmNewPW}
                    onChange={this.handleChange}
                    style={{ margin: 0 }}
                    errorText={this.state.confirmPWError}
                  />
                </div>
              </row>
            </div>
          </row>
          <row>
            <div className="col-md-12">
              <PPRaisedButton
                type="submit"
                label="Save"
                primary={!false}
                className={styles.submit}
              />
            </div>
          </row>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    update: (data) => dispatch(updateRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userOwnAccount: makeSelectUserAccount(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(settingsUser));
