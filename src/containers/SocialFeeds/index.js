/*
 * Social Feeds View
 *
 * 
 */

import React from 'react';
import { UserCanSettings } from 'config.routes/UserRoutePermissions';
import TabLink from 'elements/atm.TabLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import withReactRouter from 'elements/hoc.withReactRouter';
import PPMenuItem from 'elements/atm.MenuItem';

import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const Sidebar = styled.div`
    width: 225px;
    padding-top: 20px;
    position: fixed;
    height: 100vh;
    overflow-y: scroll;
    border-right: solid 2px #C8CED0;
    i {
      font-size: 20px;
      &:before {
          border: none !important;
          font-family: 'FontAwesome';
          content: '\f067' !important;
      }
      &.pinterest-icon-color {
        color: ${(props) => props.theme.pinterestColor} !important;
      }
      &.twitter-icon-color {
        color: ${(props) => props.theme.twitterColor} !important;
      }
      &.facebook-icon-color {
        color: ${(props) => props.theme.facebookColor} !important;
      }
      &.linkedin-icon-color {
        color: ${(props) => props.theme.linkedinColor} !important;
      }
   }
`;

const Content = styled.div`
    width: calc(100% - 225px);
    float: right;
`;

class SocialFeeds extends React.Component {

    render() {
        return (
            <div>
                <Sidebar>
                {this.props.connections &&
                    this.props.connections.map((connection) =>
                      connection.channel !== 'wordpress' &&
                        <ReactRouterMenuItem
                          key={connection.connection_id + Date.now()}
                          caption={connection.display_name}
                          title={connection.display_name}
                          isSidebar
                          icon={<i className={connection.channel_icon} />}
                          to={`/account/${this.props.params.account_id}/social_feeds/feed/${connection.connection_id}`}
                          selected={this.props.location.pathname.match(`/feed/${connection.connection_id}`) != null}
                        />
                    )
                    }
                </Sidebar>
                <Content>
                    { this.props.children }
                    {!this.props.children && <div style={{textAlign: 'center', marginTop: '50px'}}><p>Choose a connected social channel to view it's native feed here.</p></div> }
                </Content>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectAccountConnections(),
});

export default UserCanSettings(connect(mapStateToProps, mapDispatchToProps)(SocialFeeds));