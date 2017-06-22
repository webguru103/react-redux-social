/*
 * Publishing View
 *
 * 
 */

import React from 'react';
import { UserCanSettings } from 'config.routes/UserRoutePermissions';
import TabLink from 'elements/atm.TabLink';


class Publishing extends React.Component {

    render() {
        const styles = require('./styles.scss');
        return (
            <div>
                <div className={ styles.settingsBar }>
                    <TabLink to={'/account/' + this.props.params.account_id + '/calendar' } label="Calendar" />
                    <TabLink to={'/account/' + this.props.params.account_id + '/boards' } label="Boards" />
                    <TabLink to={`/account/${this.props.params.account_id}/social_feeds` } label="Social Feeds" />
                </div>
                <div className={ styles.settingsContent }>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default UserCanSettings(Publishing);