/*
 * Team View
 *
 * 
 */

import React from 'react';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

class Team extends React.Component {
    
    render() {
        return (
            <div>
                In Team view
            </div>
        );
    }
}

export default UserCanTeam(Team);