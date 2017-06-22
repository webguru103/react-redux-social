import React from 'react';

import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';
import PPTooltip from 'elements/atm.Tooltip';
import withReactRouter from 'elements/hoc.withReactRouter';

import Wrapper from './Wrapper';

const ReactRouterButton = withReactRouter(PPButton);
const PPTooltipRouter = PPTooltip(ReactRouterButton);

const BrandItem = (props) => {
  const brand = props.brand;

  const thumbURL = (brand && brand.properties.thumb_url) ? brand.properties.thumb_url : '';
  const color = (brand && brand.properties.color) ? brand.properties.color : '';
  const title = brand && brand.title ? brand.title : '';
  const accountID = brand && brand.account_id ? brand.account_id : 'me';
  const brandURL = `/account/${accountID}`;
  const accessLevel = brand && brand.user_access_level ? brand.user_access_level : '';
  const role = accessLevel === 'owner' ? accessLevel : `${accessLevel} - Shared`;

  return (
    <Wrapper>
      <ReactRouterButton
        className="brand"
        to={brandURL}
      >
        <div className="item">
          <div className="avatar">
            <PPAvatar
              size={45}
              image={thumbURL}
              title={title}
              backgroundColor={color}
            />
          </div>
          <span>
            <p className="itemTitle">{title}</p>
            <p>{role}</p>
          </span>
        </div>
      </ReactRouterButton>

      <div className="itemLink">
        <PPTooltipRouter
          className="link"
          to={brandURL}
          floating mini
          tooltip="Dashboard"
          tooltipPosition="top"
        >
          <i className="fa fa-home"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings/connections`}
          floating mini
          tooltip="Connections"
          tooltipPosition="top"
        >
          <i className="fa fa-exchange"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings/team`}
          floating mini
          tooltip="Team"
          tooltipPosition="top"
        >
          <i className="fa fa-users"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings`}
          floating mini
          tooltip="Settings"
          tooltipPosition="top"
        >
          <i className="fa fa-cog"></i>
        </PPTooltipRouter>
      </div>
    </Wrapper>
  );
};

BrandItem.propTypes = {
  brand: React.PropTypes.object,
};

export default BrandItem;
