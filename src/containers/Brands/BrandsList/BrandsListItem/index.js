import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import { truncate } from 'lodash';

import styled from 'styled-components';
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import FontIcon from 'react-toolbox/lib/font_icon';
import withReactRouter from 'elements/hoc.withReactRouter';
import Popup from 'components/Popup';

import Wrapper from './Wrapper';
import BrandImage from './BrandImage';
import BrandTitle from './BrandTitle';

import DeleteBrandDialog from '../../DeleteBrandDialog';

import { deleteBrandRequest } from '../../actions';

const CustomMenuItem = styled(MenuItem)`
  width: 170px;
  height: 36px;

  i {
    color: #8C9496;
  }

  span {
    flex-grow: 0;
  }

  &:hover {
    background: #E81C64 !important; 
    i {
      color: white !important;
    }
    div {
      color: white !important;
    }
  }
`;

const BrandRouterMenuItem = withReactRouter(CustomMenuItem);

const BrandMenuItemCaption = styled.div`
  color: #8C9496;
  margin-left: 10px;
`;

const OptionMenu = styled.a`
  width: 30px;
  height: 30px;
  text-align: right;
  position: relative;
  cursor: pointer;

  i {
    color: #8c9496;
  }
`;

class BrandsListItem extends Component {

  static propTypes = {
    brand: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      accountpath: `${location.origin}/account/${props.brand.account_id}`,
      isDialogShown: false,
      isPopupShown: false,
    };
  }

  deleteBrand = () => {
    this.setState({ isDialogShown: true });
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: false });
  }

  showPopup = () => {
    this.setState({ isPopupShown: true });
  }

  hidePopup = () => {
    this.setState({ isPopupShown: false });
  }

  BrandNavMenu = (brandURL) => (
    <Popup onOutsideClick={this.hidePopup}>
      <BrandRouterMenuItem to={`${brandURL}/settings/connections`}>
        <i className="fa fa-paper-plane"></i><BrandMenuItemCaption>Posts</BrandMenuItemCaption>
      </BrandRouterMenuItem>
      <BrandRouterMenuItem to={`${brandURL}/settings/connections`} >
        <i className="fa fa-exchange"></i><BrandMenuItemCaption>Connections</BrandMenuItemCaption>
      </BrandRouterMenuItem>
      <BrandRouterMenuItem to={`${brandURL}/settings/team`} >
        <i className="fa fa-group"></i><BrandMenuItemCaption>Team</BrandMenuItemCaption>
      </BrandRouterMenuItem>
      <BrandRouterMenuItem to={`${brandURL}/settings`} >
        <i className="fa fa-gear"></i><BrandMenuItemCaption>Settings</BrandMenuItemCaption>
      </BrandRouterMenuItem>
      <MenuDivider />
      <CustomMenuItem onClick={this.deleteBrand} >
        <i className="fa fa-trash"></i><BrandMenuItemCaption>Delete</BrandMenuItemCaption>
      </CustomMenuItem>
    </Popup>
    );

  render() {
    const brand = this.props.brand;

    const thumbnailImageKey = (brand && brand.properties && brand.properties.thumbnail_image_key) ? brand.properties.thumbnail_image_key : '';
    const thumbURL = `https://s3.amazonaws.com/powerpost/${thumbnailImageKey}`;
    let title = brand && brand.title ? brand.title : '';
    title = truncate(title, { length: 40 });
    const accountID = brand && brand.account_id ? brand.account_id : null;
    const brandColor = brand && brand.properties.color;
    const brandURL = `/account/${accountID}`;
    const shortTitle = title.substr(0, 2).toUpperCase();

    return (
      <Wrapper>
        <Link to={`${brandURL}`}>
          <BrandImage color={brandColor}>
            {thumbnailImageKey !== '' ? <img src={thumbURL} /> : <p>{shortTitle}</p>}
          </BrandImage>
        </Link>
        <BrandTitle>
          <Link to={`${brandURL}`}>{ title }</Link>
        </BrandTitle>
        <OptionMenu onClick={this.showPopup} ><FontIcon value="more_horiz" />{this.state.isPopupShown && this.BrandNavMenu(brandURL)}</OptionMenu>
        <DeleteBrandDialog
          active={this.state.isDialogShown}
          handleDialogToggle={this.handleDialogToggle}
          accountId={accountID}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    deleteBrand: (brandObject) => dispatch(deleteBrandRequest(brandObject)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default (connect(mapStateToProps, mapDispatchToProps)(BrandsListItem));
