import React, { PropTypes } from 'react';

import TabLink from 'elements/atm.TabLink';

import ChannelsListItem from './ChannelsListItem';
import ConnectionsControlBar from './ConnectionsControlBar';
import Analytics from './Analytics';

function ChannelsList({ connections, accountId, setChannelFilter, channelFilter, loading }) {
  let connectionsList;
  if ((connections !== undefined) && (connections.length > 0)) {
    connectionsList = [];
    connections.forEach((connection, index) => {
      if (connection.channel !== 'wordpress') {
        connectionsList.push(
          connection.status === '3' ?
            <TabLink graySelect key={`${index}a`}>
              <ChannelsListItem connection={connection} key={`${index}a`} />
            </TabLink> :
            <TabLink graySelect to={`/account/${accountId}/statistics/${connection.connection_id}`} key={`${index}a`}>
              <ChannelsListItem connection={connection} />
            </TabLink>
        );
      }
    });
  } else {
    connectionsList = 'You currently have no connections';
  }

  return (
    <Analytics>
      <div className="tabLink">
        <ConnectionsControlBar
          setChannelFilter={setChannelFilter}
          channelFilter={channelFilter}
        />
        { connectionsList }
      </div>
      <div className="tabContent">
        { loading }
      </div>
    </Analytics>
  );
}

ChannelsList.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  accountId: PropTypes.string,
  loading: PropTypes.any,
  setChannelFilter: PropTypes.func.isRequired,
  channelFilter: PropTypes.string.isRequired,
};

export default ChannelsList;
