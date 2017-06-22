/*
 * Posts View
 *
 * 
 */

import React from 'react';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';

class Workflow extends React.Component {
    
    render() {
        return (
            <div>
                in Workflow view
            </div>
        );
    }
}

export default UserCanAccount(Workflow);