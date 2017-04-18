/*
 * Plans View
 *
 * 
 */

import React from 'react';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

class Plans extends React.Component {
    
    render() {
        return (
            <div>
                In Plans view
            </div>
        );
    }
}

export default UserCanTeam(Plans);