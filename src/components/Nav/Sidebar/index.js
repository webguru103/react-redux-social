import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import withReactRouter from 'elements/hoc.withReactRouter';
import FontIcon from 'elements/atm.FontIcon';
import PPMenu from 'elements/atm.Menu';
import PPMenuItem from 'elements/atm.MenuItem';
import PPMenuDivider from 'elements/atm.MenuDivider';
import PPIconButton from 'elements/atm.IconButton';

// Replace with own Icons eventually
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styles from './styles.scss';
import PPLogo from './PP_Icon.png';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.renderFull = this.renderFull.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const isPrevPathAccount = this.props.location.pathname.match('/account/');
    const isNextPathAccount = nextProps.location.pathname.match('/account/');
    if (!nextProps.isMenuCollapsed && !isNextPathAccount) {
      this.props.handleMenuToggle(true);
    } else if (nextProps.isMenuCollapsed && isNextPathAccount && !isPrevPathAccount) {
      this.props.handleMenuToggle(false);
    }
    return true;
  }

  renderFull() {
    return (
      <div>
        <div className={styles.brandNav}>
          <div className={styles.powerpostLogoContainer} >
            <Link to="/"><img src={PPLogo} alt="Powerpost Logo" style={{ marginTop: '15px' }} /></Link>
          </div>
          <div>
            { this.props.userAccount && this.props.userAccount.account_type_id !== 5 &&
              <Link to={`/account/${this.props.userAccount.account_id}`} key={this.props.userAccount.account_id}>
                <div className={this.props.accountId === this.props.userAccount.account_id ? styles.activeBrand : styles.brandContainer}>

                  <span>{ this.props.userAccount.title ? this.props.userAccount.title.slice(0, 2).toUpperCase() : '' } </span>
                  { this.props.userAccount.account_type_id === 2 &&
                  <IconMenu
                    iconButtonElement={<IconButton iconStyle={{ width: '20px', height: '20px' }} style={{ width: '20px', height: '20px', position: 'absolute', top: '0', left: '0', padding: '0' }}><ContentAdd color="white" /></IconButton>}
                    style={{ width: '20px', height: '20px', backgroundColor: '#00d2AF', position: 'absolute', right: '-5px', borderRadius: '5px', bottom: '-10px' }}
                  >
                    <Subheader>Main Brand</Subheader>
                    <ReactRouterMenuItem isSidebar caption={this.props.userAccount.title} to={`/account/${this.props.userAccount.account_id}`} />
                    <Subheader>Sub Accounts</Subheader>
                    { this.props.userAccount.subaccounts && this.props.userAccount.subaccounts.map((subAccount) =>
                      <ReactRouterMenuItem key={subAccount.account_id} caption={subAccount.title} to={`/account/${subAccount.account_id}`} />
                                        )}
                  </IconMenu>
                            }
                </div>
              </Link>
                    }

            { this.props.sharedAccounts && this.props.sharedAccounts.map((account) =>
              <Link to={`/account/${account.account_id}`} key={account.account_id}>
                <div className={this.props.accountId === account.account_id ? styles.activeBrand : styles.brandContainer}>
                  <span> {account.title ? account.title.slice(0, 2).toUpperCase() : ''} </span>
                  { account.account_type_id === 2 &&
                    <IconMenu
                      iconButtonElement={<IconButton iconStyle={{ width: '20px', height: '20px' }} style={{ width: '20px', height: '20px', position: 'absolute', top: '0', left: '0', padding: '0' }}><ContentAdd color="white" /></IconButton>}
                      style={{ width: '20px', height: '20px', backgroundColor: '#00d2AF', position: 'absolute', right: '-5px', borderRadius: '5px', bottom: '-10px' }}
                    >
                      <Subheader>Main Brand</Subheader>
                      <ReactRouterMenuItem isSidebar caption={account.title} to={`/account/${account.account_id}`} />
                      <Subheader>Sub Accounts</Subheader>
                      { account.subaccounts && account.subaccounts.map((subAccount) =>
                        <ReactRouterMenuItem key={subAccount.account_id} caption={subAccount.title} to={`/account/${subAccount.account_id}`} />
                                        )}
                    </IconMenu>
                                }
                </div>
              </Link>
                        )
                    }
          </div>
        </div>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { this.props.location.pathname.match('/account/') &&
            <div className={styles.mainNav} key="mainNavKey">
              <div>
                <h2 className={styles.brandTitle}>{ this.props.activeBrand.title } </h2>
                { this.props.accountPermissions && this.props.accountPermissions.indexOf('settings') > -1 &&
                  <Link to={`/account/${this.props.accountId}/settings`}>
                    <PPIconButton style={{ float: 'right', position: 'absolute', top: '14px' }}>
                      <FontIcon>settings</FontIcon>
                    </PPIconButton>
                  </Link>
                }
              </div>
              <PPMenu isSidebar selectable>
                <ReactRouterMenuItem caption="Library" isSidebar icon={<FontIcon>photo_library</FontIcon>} to={`/account/${this.props.accountId}/library`} />
                <PPMenuDivider />
                <ReactRouterMenuItem caption="Calendar" isSidebar icon={<FontIcon>date_range</FontIcon>} to={`/account/${this.props.accountId}/calendar`} />
                <ReactRouterMenuItem caption="Workflow" isSidebar icon={<FontIcon>view_column</FontIcon>} to={`/account/${this.props.accountId}/workflow`} />
                <ReactRouterMenuItem caption="List" isSidebar icon={<FontIcon>list</FontIcon>} to={`/account/${this.props.accountId}/list`} />
                { this.props.accountPermissions && this.props.accountPermissions.indexOf('statistics') > -1 &&
                <div>
                  <PPMenuDivider />
                  <ReactRouterMenuItem caption="Statistics" isSidebar icon={<FontIcon>insert_chart</FontIcon>} to={`/account/${this.props.accountId}/statistics`} />
                </div>
                                }
                { this.props.accountPermissions && this.props.accountPermissions.indexOf('connections') > -1 &&
                <div>
                  <PPMenuDivider />
                  <ReactRouterMenuItem caption="Connections" isSidebar icon={<FontIcon>open_in_browser</FontIcon>} to={`/account/${this.props.accountId}/settings/connections`} />
                </div>
                                }
                { this.props.accountPermissions && this.props.accountPermissions.indexOf('team') > -1 &&
                <ReactRouterMenuItem caption="Team" isSidebar icon={<FontIcon>people</FontIcon>} to={`/account/${this.props.accountId}/settings/team`} />
                                }
                { this.props.activeBrand.account_type_id === 6 &&
                <ReactRouterMenuItem caption="Brands" isSidebar icon={<FontIcon>library_add</FontIcon>} to={`/account/${this.props.accountId}/brands`} />
                                }
                { this.props.activeBrand.connections &&
                <Subheader style={{ color: '#C9C6Cf' }}>Social Feeds</Subheader>
                                }

                {this.props.activeBrand.connections &&
                  this.props.activeBrand.connections.map((connection) =>
                    connection.channel !== 'wordpress' &&
                      <ReactRouterMenuItem
                        key={connection.connection_id + Date.now()}
                        caption={connection.display_name}
                        title={connection.display_name}
                        isSidebar
                        icon={<i className={connection.channel_icon} />}
                        to={`/account/${this.props.accountId}/feed/${connection.connection_id}`}
                        selected={this.props.location.pathname.match(`/feed/${connection.connection_id}`) != null}
                      />
                  )
                }

              </PPMenu>
            </div>
                    }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  renderCollapsed() {
    return (
      <div className={styles.mainNavCollapsed}>
        <div className={styles.activeBrand} >
          <span>{ this.props.activeBrand.title ? this.props.activeBrand.title.slice(0, 2).toUpperCase() : ''}</span>
        </div>
        <PPMenu isSidebar>
          <ReactRouterMenuItem isSidebar icon={<FontIcon>photo_library</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/library`} />
          <ReactRouterMenuItem isSidebar icon={<FontIcon>date_range</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/calendar`} />
          <ReactRouterMenuItem isSidebar icon={<FontIcon>view_column</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/workflow`} />
          <ReactRouterMenuItem isSidebar icon={<FontIcon>list</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/list`} />
          { this.props.accountPermissions && this.props.accountPermissions.indexOf('statistics') > -1 &&
          <ReactRouterMenuItem isSidebar icon={<FontIcon>insert_chart</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/statistics`} />
                            }
          { this.props.accountPermissions && this.props.accountPermissions.indexOf('connections') > -1 &&
          <ReactRouterMenuItem isSidebar icon={<FontIcon>open_in_browser</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings/connections`} />
                            }
          { this.props.accountPermissions && this.props.accountPermissions.indexOf('team') > -1 &&
          <ReactRouterMenuItem isSidebar icon={<FontIcon>people</FontIcon>} style={{ width: '60px' }} to={`/account/${this.props.accountId}settings/team`} />
                            }
        </PPMenu>
      </div>
    );
  }

  render() {
    const isAccountPath = this.props.location.pathname.match('/account/');
    const className = cx(styles.sidebar, {
      [styles.collapsed]: this.props.isMenuCollapsed && isAccountPath,
      [styles.userMenu]: this.props.isMenuCollapsed && !isAccountPath,
    });

    return (
      <div className={className} key="sidebarCollapsed">
        { this.renderFull() }
        { this.renderCollapsed() }
      </div>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  isMenuCollapsed: PropTypes.bool,
  accountPermissions: PropTypes.any,
  accountId: PropTypes.string,
  activeBrand: PropTypes.object,
  sharedAccounts: PropTypes.any,
  userAccount: PropTypes.object,
  handleMenuToggle: PropTypes.func,
};

export default Sidebar;
