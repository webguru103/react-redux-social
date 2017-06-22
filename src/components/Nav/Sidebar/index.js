import React, { PropTypes } from 'react';
import cx from 'classnames';

import withReactRouter from 'elements/hoc.withReactRouter';
import PPMenu from 'elements/atm.Menu';
import PPMenuItem from 'elements/atm.MenuItem';

import PPTooltip from 'elements/atm.Tooltip';
import PPButton from 'elements/atm.Button';

import styles from './styles.scss';
import CollapsedWrapper from './CollapsedWrapper';
import MainNavWrapper from './MainNavWrapper';


const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const ReactRouterMenuItemWithTooltip = PPTooltip(ReactRouterMenuItem);

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
      this.props.handleMenuToggle(false);
    } else if (nextProps.isMenuCollapsed && isNextPathAccount && !isPrevPathAccount) {
      // this.props.handleMenuToggle(true);
    }
    return true;
  }

  renderFull() {
    return (
      <div>
        { this.props.location.pathname.match('/account/') &&
          <MainNavWrapper isCollapsed={this.props.isMenuCollapsed} key="mainNavKey" isMultiBrand={this.props.activeBrand && (this.props.activeBrand.account_type_id === 2 || this.props.activeBrand.account_type_id === 3 || this.props.activeBrand.account_type_id === 7)}>
            <PPButton
              label={
                <div>
                  <span className="button-plus">+ </span>
                  <span className="button-title">Create Post</span>
                </div>
              }
              style={{ margin: '0 auto', display: 'block', marginTop: '10px', width: '200px' }}
              className="new-post-button"
              onClick={this.props.createPostSet}
              primary
            />
            <PPMenu isSidebar selectable>
              <ReactRouterMenuItem caption="Dashboard" activeClassName={styles.active} isSidebar icon={<i className="fa fa-home" />} to={`/account/${this.props.accountId}`} />
              { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('brands') > -1 &&
              <ReactRouterMenuItem caption="Brands" activeClassName={styles.active} isSidebar icon={<i className="fa fa-th-large" />} to={`/account/${this.props.accountId}/brands`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('content_library') > -1 &&
                <ReactRouterMenuItem caption="Content" activeClassName={styles.active} isSidebar icon={<i className="fa fa-folder" />} to={`/account/${this.props.accountId}/library`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                <ReactRouterMenuItem caption="Status Boards" activeClassName={styles.active} isSidebar icon={<i className="fa fa-columns" />} to={`/account/${this.props.accountId}/boards`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                <ReactRouterMenuItem caption="Calendar" activeClassName={styles.active} isSidebar icon={<i className="fa fa-calendar" />} to={`/account/${this.props.accountId}/calendar`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                <ReactRouterMenuItem caption="Posts" activeClassName={styles.active} isSidebar icon={<i className="fa fa-send" />} to={`/account/${this.props.accountId}/posts`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                <ReactRouterMenuItem caption="Published" activeClassName={styles.active} isSidebar icon={<i className="fa fa-history" />} to={`/account/${this.props.accountId}/published`} />
              }
              {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                <ReactRouterMenuItem caption="Social Feeds" activeClassName={styles.active} isSidebar icon={<i className="fa fa-list-ul" />} to={`/account/${this.props.accountId}/social_feeds`} />
              }
              { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('statistics') > -1 &&
                <ReactRouterMenuItem caption="Analytics" activeClassName={styles.active} isSidebar icon={<i className="fa fa-bar-chart" />} to={`/account/${this.props.accountId}/statistics`} />
              }
              { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('connections') > -1 &&
                <ReactRouterMenuItem caption="Connections" activeClassName={styles.active} isSidebar icon={<i className="fa fa-exchange" />} to={`/account/${this.props.accountId}/settings/connections`} />
              }
              { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('team') > -1 &&
                <ReactRouterMenuItem caption="Team" activeClassName={styles.active} isSidebar icon={<i className="fa fa-group" />} to={`/account/${this.props.accountId}/settings/team`} />
              }
              { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('settings') > -1 &&
                <ReactRouterMenuItem caption="Settings" activeClassName={styles.active} isSidebar icon={<i className="fa fa-cog" />} to={`/account/${this.props.accountId}/settings`} />
              }
              <PPMenuItem onClick={this.props.handleMenuToggle} caption="Collapse Menu" isSidebar style={{ position: 'fixed', bottom: '0', marginBottom: '10px' }} icon={<i className="fa fa-compress" />} />
            </PPMenu>
          </MainNavWrapper>
        }
      </div>
    );
  }

  renderCollapsed() {
    return (
      <div>
        { this.props.location.pathname.match('/account/') &&
        <CollapsedWrapper isCollapsed={this.props.isMenuCollapsed}>
          <PPButton
            label={<i className="fa fa-plus" />}
            style={{ margin: '0 auto', display: 'block', marginTop: '10px', width: '40px', minWidth: '0px' }}
            className="new-post-button"
            onClick={this.props.createPostSet}
            primary
          />
          <PPMenu isSidebar selectable >
            <ReactRouterMenuItemWithTooltip tooltip="Dashboard" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-home" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}`} />
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('brands') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Brands" tooltipPosition="right" isCollapsed style={{ width: '60px' }} isSidebar icon={<i className="fa fa-th-large" />} to={`/account/${this.props.accountId}/brands`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('content_library') > -1 &&
            <ReactRouterMenuItemWithTooltip tooltip="Content" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-folder" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/library`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Status Boards" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-columns" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/boards`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Calendar" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-calendar" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/calendar`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Posts" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-send" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/posts`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Published" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-history" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/published`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Social Feeds" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-list-ul" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/social_feeds`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('statistics') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Analytics" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-line-chart" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/statistics`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('connections') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Connections" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-exchange" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings/connections`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('team') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Team" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-group" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings/team`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('settings') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Settings" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-cog" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings`} />
            }
            <PPMenuItem onClick={this.props.handleMenuToggle} isCollapsed isSidebar style={{ width: '60px', position: 'fixed', bottom: '0', marginBottom: '10px' }} icon={<i className="fa fa-expand" />} />
          </PPMenu>
        </CollapsedWrapper>
        }
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
  createPostSet: PropTypes.func,
  userPermissions: PropTypes.array,
  location: PropTypes.object,
  isMenuCollapsed: PropTypes.bool,
  accountId: PropTypes.string,
  activeBrand: PropTypes.object,
  handleMenuToggle: PropTypes.func,
};

export default Sidebar;
