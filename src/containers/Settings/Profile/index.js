/*
 * Profile
 *
 * 
 */

import React from 'react';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

class Profile extends React.Component {
    
    render() {
        return (
            <div>
                In Profile view
            </div>
        );
    }
}

export default UserCanTeam(Profile);