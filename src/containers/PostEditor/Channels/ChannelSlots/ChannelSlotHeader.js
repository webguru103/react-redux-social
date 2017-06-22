import React from 'react';
import PropTypes from 'prop-types';

function ChannelSlotHeader({ connection }) {
  return (
    <div className="slot-header">
      <i className={connection.channel_icon} />
      <span>{connection.display_name}</span>
    </div>
  );
}

ChannelSlotHeader.propTypes = {
  connection: PropTypes.object,
};

export default ChannelSlotHeader;
