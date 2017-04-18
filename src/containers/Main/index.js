/**
 * 
 * Dashboard
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';
import {connect} from 'react-redux';

import Nav from 'components/Nav';

import { UserIsAuthenticated } from 'config.routes/UserIsAuthenticated';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import { makeSelectUser, 
         makeSelectUserAccount,
         makeSelectSharedAccounts,
         makeSelectSubAccounts,
         makeSelectUserAvatar,
} from 'containers/App/selectors';

import { checkUser,
         logout
} from 'containers/App/actions';

import { toggleMenu,
         fetchCurrentAccount,
} from './actions';

import { makeSelectMenuCollapsed,
         makeSelectCurrentAccount,
         makeSelectAccountPermissions
} from './selectors';

class Main extends React.Component{
    constructor(props) {
        super(props);
        
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.account_id != this.props.params.account_id) {
            this.props.fetchAccount(nextProps.params.account_id);
        }
    }
    
    componentDidMount() {
        this.props.fetchAccount(this.props.params.account_id);  
    }
    
    handleMenuToggle() {
        this.props.toggleMenuCollapse(!this.props.menuCollapsed);    
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
        return(
        <div>
            <Nav accountPermissions = { this.props.accountPermissions } location={ this.props.location } logout={ this.props.logout } user={ this.props.user } handleMenuToggle={ this.handleMenuToggle } isMenuCollapsed = { this.props.menuCollapsed } activeBrand = { this.props.activeBrand } accountId = { this.props.params.account_id } userAccount = { this.props.userAccount } sharedAccounts = { this.props.sharedAccounts } subAccounts = { this.props.subAccounts } />
            <div className={[viewContentStyle, styles.viewContent].join(' ') }>
                { this.props.children }
            </div>
        </div>
    );
    }
}

Main.propTypes = {
    children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
    return {
        checkUserObject: (user) => dispatch(checkUser(user)),
        toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed)),
        logout: () => dispatch(logout()),
        fetchAccount: (accountId) => dispatch(fetchCurrentAccount(accountId))
    };
}

const mapStateToProps = (initialState, initialProps) => {
    const selectUser = makeSelectUser();
    const selectMenuCollapsed = makeSelectMenuCollapsed();
    const selectSharedAccounts = makeSelectSharedAccounts();
    const selectActiveBrand = makeSelectCurrentAccount();
    const selectSubAccounts = makeSelectSubAccounts();
    const selectUserAccount = makeSelectUserAccount();
    const selectUserAvatar = makeSelectUserAvatar();
    const selectAccountPermissions = makeSelectAccountPermissions();
    
    return (state, ownProps) => ({
        user: selectUser(state),
        menuCollapsed: selectMenuCollapsed(state),
        sharedAccounts: selectSharedAccounts(state),
        activeBrand: selectActiveBrand(state),
        subAccounts: selectSubAccounts(state),
        userAccount: selectUserAccount(state),
        userAvatar: selectUserAvatar(state),
        accountPermissions: selectAccountPermissions(state),
        location: ownProps.location
    });
};

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Main));