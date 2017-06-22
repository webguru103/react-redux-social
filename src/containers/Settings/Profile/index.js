/*
 * Profile
 *
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PPTextField from 'elements/atm.TextField';
import PPTextArea from 'elements/atm.TextArea';
import PPAvatar from 'elements/atm.Avatar';
import PPButton from 'elements/atm.Button';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import { makeSelectFilePickerKey } from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';
import { fetchCurrentAccount } from 'containers/Main/actions';

import { updateAccount } from './actions';

import Wrapper from './Wrapper';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getAvatarandColor = this.getAvatarandColor.bind(this);
    this.accountProfileSave = this.accountProfileSave.bind(this);

    const { profile, params } = this.props;
    const propsProperties = (profile && profile.properties) ? profile.properties : null;
    const initialProperties = {
      description: '',
      facebook_url: '',
      twitter_url: '',
      website_url: '',
      newsletter_url: '',
      store_url: '',
      phone_number: '',
      thumb_url: '',
      color: '',
      accountID: params.account_id,
    };

    const properties = Object.assign({}, initialProperties, propsProperties);

    this.state = {
      avatarKey: '',
      avatar: properties.thumb_url,
      name: profile && profile.title ? profile.title : '',
      description: properties.description,
      facebook: properties.facebook_url,
      twitter: properties.twitter_url,
      website: properties.website_url,
      newsletterSignUp: properties.newsletter_url,
      storeURL: properties.store_url,
      contactPhoneNumber: properties.phone_number,
      color: properties.color,
      accountID: properties.accountID,
      profile: this.props.profile || null,
    };
  }

  componentDidMount() {
    this.props.getAccountProfile(this.state.accountID);
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile;
    const propsProperties = (profile && profile.properties) ? profile.properties : null;

    const initialProperties = {
      description: '',
      facebook_url: '',
      twitter_url: '',
      website_url: '',
      newsletter_url: '',
      store_url: '',
      phone_number: '',
      thumb_url: '',
      color: '',
    };

    if ((JSON.stringify(this.state.profile) !== JSON.stringify(profile)) && profile) {
      this.props.getAccountProfile(this.state.accountID);
      const properties = Object.assign({}, initialProperties, propsProperties);
      this.setState({
        name: profile && profile.title ? profile.title : '',
        avatar: properties.thumb_url,
        description: properties.description,
        facebook: properties.facebook_url,
        twitter: properties.twitter_url,
        website: properties.website_url,
        newsletterSignUp: properties.newsletter_url,
        storeURL: properties.store_url,
        contactPhoneNumber: properties.phone_number,
        color: properties.color,
        profile: nextProps.profile,
      });
    }
  }

  getAvatarandColor(uploadedAvatar, BKColor) {
    this.setState({
      avatarKey: uploadedAvatar,
      color: BKColor,
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  accountProfileSave(event) {
    event.preventDefault();

    const state = this.state;
    const data = {
      accountID: state.accountID,
      update: {
        payload: {
          title: state.name,
          properties: {
            thumbnail_image_key: state.avatarKey,
            description: state.description,
            facebook_url: state.facebook,
            twitter_url: state.twitter,
            website_url: state.website,
            newsletter_url: state.newsletterSignUp,
            store_url: state.storeURL,
            phone_number: state.contactPhoneNumber,
            color: state.color,
          },
        },
      },
    };

    this.props.save(data);
  }

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.accountProfileSave}>
          <div className="avatar-image">
            <PPAvatar
              size={180}
              header="Logo"
              image={this.state.avatar}
              title={this.state.name}
              backgroundColor={this.state.color}
              filePickerKey={this.props.filePickerKey}
              getAvatarandColor={this.getAvatarandColor}
            />
          </div>
          <div className="basic-info">
            <PPTextField
              type="text"
              name="name"
              floatingLabelText="Name"
              maxLength={100}
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <PPTextArea
              type="text"
              name="description"
              floatingLabelText="Description"
              maxLength={500}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <PPButton
              type="submit"
              label="Save"
              primary={!false}
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getAccountProfile: (accountID) => dispatch(fetchCurrentAccount(accountID)),
    save: (data) => dispatch(updateAccount(data)),
  };
}

Profile.propTypes = {
  getAccountProfile: React.PropTypes.func,
  filePickerKey: React.PropTypes.string,
  profile: React.PropTypes.object,
  params: React.PropTypes.object,
  save: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectCurrentAccount(),
  filePickerKey: makeSelectFilePickerKey(),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Profile));
