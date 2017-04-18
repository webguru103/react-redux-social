import React, { PropTypes, Component } from 'react';

import PPIconButton from 'elements/atm.IconButton';
import PPMenuItem from 'elements/atm.MenuItem';
import PPIconMenu from 'elements/atm.IconMenu';
import PPAvatar from 'elements/atm.Avatar';
import withReactRouter from 'elements/hoc.withReactRouter';

// Replace with own Icons eventually
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import styles from './styles.scss';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
      userMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      userMenuOpen: false,
    });
  }
  handleTouch(event) {
    console.log('in handleTouch', event);
  }
  render() {
    const isAccountPath = this.props.location.pathname.match('/account/');

    const viewStyle = this.props.isMenuCollapsed ? styles.collapsed : styles.full;
    const accountStyle = isAccountPath ? styles.accountTopNav : styles.userTopNav;

    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '';
    return (
      <div className={[styles.topNav, viewStyle, accountStyle].join(' ')}>
        { isAccountPath &&
        <PPIconButton inBar onClick={this.props.handleMenuToggle} >
          { this.props.isMenuCollapsed ? (
            <NavigationMenu />
                    ) : (
                      <HardwareKeyboardArrowLeft />
                    )}
        </PPIconButton>
                }
        <div className={styles.userContainer} >
          <PPIconMenu
            open={this.state.userMenuOpen}
            position="topRight"
            icon={<PPAvatar image={avatar} />}
          >
            <ReactRouterMenuItem caption="Settings" to={'/user/settings'} />
            <PPMenuItem caption="Logout" onTouchTap={this.props.logout} />
          </PPIconMenu>
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  isMenuCollapsed: PropTypes.bool,
  location: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  handleMenuToggle: PropTypes.func,
};

export default TopNav;
