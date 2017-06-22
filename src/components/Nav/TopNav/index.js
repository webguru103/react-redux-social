import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownMenu from 'react-dd-menu';
import PPMenuItem from 'elements/atm.MenuItem';
import PPAvatar from 'elements/atm.Avatar';
import withReactRouter from 'elements/hoc.withReactRouter';

import BrandDropdown from './BrandDropdown';
import PPLogo from './PPLogo';
import Avatar from './Avatar';
import AvatarWrapper from './AvatarWrapper';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

const DropDownMenu = styled(DropdownMenu)`
  .dd-menu-items {
    position: absolute;
    right: 20px;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    ul {
      padding: 0;
      width: 130px;
      text-align:center;
    }
  }
`;

const SubBrandItem = styled.div`
  width: 200px;
  margin-left: 50px;
  margin-right: 10px;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background-color: ${(props) => props.isActive ? '#E7ECEE' : 'white'};
  &:hover {
    background-color: #E7ECEE;
  }
  div {
    float: left;
    height: 20px;
    width: 20px;
    margin: 5px;
  }

  span {
    font-family: Lato-Regular;
    font-size: 12px;
    color: #616668;
    letter-spacing: 0;
    margin-left: 10px;
  }
`;

const BrandItem = styled.div`
  width: 250px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 4px;
  height: 42px;
  line-height: 42px;
  cursor: pointer;
  background-color: ${(props) => props.isActive ? '#E7ECEE' : 'white'};
  &:hover {
    background-color: #E7ECEE;
  }
  div {
    float: left;
    height: 32px;
    width: 32px;
    margin: 5px;
  }

  span {
    font-family: Lato-Regular;
    font-size: 13px;
    color: #616668;
    letter-spacing: 0;
    margin-left: 10px;
  }
`;

const BrandItemLink = withReactRouter(BrandItem);
const SubBrandItemLink = withReactRouter(SubBrandItem);

const BrandIcon = styled.div`
  border-radius: 2.5px;
  background-image: ${(props) => props.thumbnail ? `url(${props.thumbnail})` : `linear-gradient(-180deg, ${props.color} 26%, ${props.color} 100%)`};
  opacity: 1;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
  line-height: 32px;
  font-size: 12px;
  margin-bottom: 20px;
  margin-top: 18px;
  position: relative;
  color: white;
  transition: all .3s ease;
  &:active, &:focus {
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  position:fixed;
  top: 0;
  z-index: 10000;
  height: 60px;
  right: 0;
  transition: transform .3s ease-in-out, width .3s ease-in-out;
  background-image: linear-gradient(-180deg, #E81C64 1%, #B6134D 100%);
  box-shadow: 0 1px 6px 0 rgba(60,92,129,0.20);
  width: ${(props) => props.isNotFullWidth ? 'calc(100% - 60px)' : '100%'};

  .new-post-button {
    margin-top: 13px;
    margin-right: 10px;
    float: right;
    color: #ffffff;
    padding: 0 20px;
    .button-plus {
      font-size: 19px;
      margin-right: 6px;
      vertical-align: middle;
    }
    .button-title {
      font-size: 12px;
      vertical-align: middle;
    }
  }
`;

const DropdownButton = styled.div`
  display: inline-block;
  margin-left: 20px;
  line-height: 60px;
  cursor: pointer;
  span {
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  i {
    color: white;
    margin-left: 5px;
    font-size: 12px;
  }
`;

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
      brandMenuOpen: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountId !== nextProps.accountId) {
      this.setState({
        brandMenuOpen: false,
        userMenuOpen: false,
      });
    }
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
      userMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  toggleBrands = () => {
    this.setState({ brandMenuOpen: !this.state.brandMenuOpen });
  }

  toggle = () => {
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }

  handleRequestClose() {
    this.setState({
      userMenuOpen: false,
    });
  }

  render() {
    const isAccountPath = this.props.location.pathname.includes('/account/');
    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '';
    const accountColor = this.props.user && this.props.user.properties ? this.props.user.properties.color : '#E7ECEE';
    const accountId = this.props.accountId;
    const startingTitle = isAccountPath ? this.props.activeBrand.title : 'Select Brand';
    const menuOptions = {
      isOpen: this.state.userMenuOpen,
      close: this.handleRequestClose,
      toggle: <Avatar onClick={this.toggle}>
        <PPAvatar
          size={40}
          radius={10}
          image={avatar}
          title={this.props.user.display_name}
          backgroundColor={accountColor}
          isClickable={false}
        />
      </Avatar>,
      align: 'left',
    };

    return (
      <Wrapper>
        <PPLogo />
        <DropdownButton onClick={this.toggleBrands}>
          <span>{startingTitle}</span><i className="fa fa-chevron-down" />
        </DropdownButton>
        { this.state.brandMenuOpen &&
          <BrandDropdown onOutsideClick={this.toggleBrands}>
            {this.props.userAccount && this.props.userAccount.account_type_id !== '5' &&
              <BrandItemLink to={`/account/${this.props.userAccount.account_id}`} isActive={this.props.userAccount.account_id === accountId}>
                <BrandIcon thumbnail={this.props.userAccount.properties && this.props.userAccount.properties.thumb_url ? this.props.userAccount.properties.thumb_url : null} color={this.props.userAccount.properties && this.props.userAccount.properties.color ? this.props.userAccount.properties.color : '#E52466'} />
                <span>{this.props.userAccount.title}</span>
              </BrandItemLink>
            }
            {this.props.userAccount.subaccounts.length > 0 && this.props.userAccount.subaccounts.map((brand, i) =>
              <SubBrandItemLink key={i} to={`/account/${brand.account_id}`} isActive={brand.account_id === accountId}>
                <BrandIcon thumbnail={brand.properties && brand.properties.thumb_url ? brand.properties.thumb_url : null} color={brand.properties && brand.properties.color ? brand.properties.color : '#E52466'} />
                <span>{brand.title}</span>
              </SubBrandItemLink>
            )}
            {(this.props.sharedAccounts.length > 0 && this.props.sharedAccounts.map((brand, i) => {
              return <BrandItemLink key={i} to={`/account/${brand.account_id}`} isActive={brand.account_id === accountId} >
                <BrandIcon thumbnail={brand.properties && brand.properties.thumb_url ? brand.properties.thumb_url : null} color={brand.properties && brand.properties.color ? brand.properties.color : '#E52466'} />
                <span>{brand.title}</span>
              </BrandItemLink>
                {brand.subaccounts.length > 0 && brand.subaccounts.map((subbrand, i) => 
                  <SubBrandItemLink key={i} to={`/account/${subbrand.account_id}`} isActive={subbrand.account_id === accountId}>
                    <BrandIcon thumbnail={subbrand.properties && subbrand.properties.thumb_url ? subbrand.properties.thumb_url : null} color={subbrand.properties && subbrand.properties.color ? subbrand.properties.color : '#E52466'} />
                    <span>{subbrand.title}</span>
                  </SubBrandItemLink>
                )}
              }             
            ))}
          </BrandDropdown>
        }
        <AvatarWrapper>
          <DropDownMenu {...menuOptions}>
            <ReactRouterMenuItem caption="Dashboard" to={'/'} />
            <ReactRouterMenuItem caption="Settings" to={'/user/settings'} />
            <PPMenuItem caption="Logout" onTouchTap={this.props.logout} />
          </DropDownMenu>
        </AvatarWrapper>
      </Wrapper>
    );
  }
}


TopNav.propTypes = {
  accountId: PropTypes.string,
  location: PropTypes.shape(),
  userAccount: PropTypes.object,
  sharedAccounts: PropTypes.array,
  user: PropTypes.shape(),
  activeBrand: PropTypes.shape(),
  logout: PropTypes.func,
};

export default TopNav;
