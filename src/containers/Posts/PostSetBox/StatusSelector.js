import React from 'react';
import PropTypes from 'prop-types';

const StatusSelector = ({
  activeStatus,
  onChange,
  statuses,
}) => (
  <div className="status-selector">
    {
      statuses.map((status) =>
        <div
          key={status.status}
          className={`${parseInt(activeStatus, 10) === status.status ? 'active-status' : ''} status-item`}
          onClick={() => onChange(status.status)}
          style={{ backgroundColor: status.statusColor, border: `2px solid ${status.statusColor}` }}
        >
          {status.name}
          <span className="status-size">{status.size}</span>
        </div>
      )
    }
  </div>
);

StatusSelector.propTypes = {
  activeStatus: PropTypes.bool,
  onChange: PropTypes.func,
  statuses: PropTypes.array,
};

export default StatusSelector;
