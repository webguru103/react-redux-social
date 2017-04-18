import React from 'react';

import ConnectionsListItem from './ConnectionsListItem';

const ConnectionsList = function ConnectionsList(props) {
  let connectionsList;

  if ((props.connections !== undefined) && (props.connections.length > 0)) {
    connectionsList = [];

    props.connections.map((connection, index) => {
      connectionsList.push(<ConnectionsListItem key={index} connection={connection} remove={props.removeConnection} />);
      return true;
    });
  } else {
    connectionsList = 'You currently have no connections';
  }

  return (
    <div>
      { connectionsList }
    </div>
  );
};

ConnectionsList.propTypes = {
  connections: React.PropTypes.array,
  removeConnection: React.PropTypes.func,
};

export default ConnectionsList;
