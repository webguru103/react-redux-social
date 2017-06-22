/*
 * Settings View
 *
 *
 */

import React from 'react';
import { UserCanSettings } from 'config.routes/UserRoutePermissions';
import TabLink from 'elements/atm.TabLink';


class Settings extends React.Component {

  render() {
    const styles = require('./styles.scss');
    return (
      <div>
        <div className={styles.settingsBar}>
          <TabLink to={`/account/${this.props.params.account_id}/settings/profile`} label="Profile" />
          <TabLink to={`/account/${this.props.params.account_id}/settings/team`} label="Team" />
          <TabLink to={`/account/${this.props.params.account_id}/settings/plans`} label="Plans" />
          <TabLink to={`/account/${this.props.params.account_id}/settings/connections`} label="Connections" />
        </div>
        <div className={styles.settingsContent}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.any,
};

export default UserCanSettings(Settings);
