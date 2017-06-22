import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Wrapper from './Wrapper';

class SchedulesBlock extends Component {

  static propTypes = {
    scheduleTimes: PropTypes.array,
    onChangeScheduleTimes: PropTypes.func,
  };

  removeSchedule = (index) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.splice(index, index + 1);
    onChangeScheduleTimes(newScheduleTimes);
  }

  addSchedule = () => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    newScheduleTimes.push(newScheduleTimes[newScheduleTimes.length - 1]);
    onChangeScheduleTimes(newScheduleTimes);
  }

  changeDate = (index, date) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    newScheduleTimes[index] = new Date(date).getTime();
    onChangeScheduleTimes(newScheduleTimes);
  }

  changeTime = (index, time) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    const newTime = new Date(time);
    const newDateTime = new Date(newScheduleTimes[index]);
    newDateTime.setHours(newTime.getHours(), newTime.getMinutes(), newTime.getSeconds());
    newScheduleTimes[index] = newDateTime.getTime();
    onChangeScheduleTimes(newScheduleTimes);
  }

  render() {
    const { scheduleTimes } = this.props;
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    return (
      <Wrapper>
        <div className="controls-wrapper heading">
          <div className="first">
            Date
          </div>
          <div className="second">
            Time
          </div>
          <div className="action">
          </div>
        </div>
        {
          scheduleTimes.map((scheduleTime, index) =>
            <div className="controls-wrapper date-time-picker" key={index}>
              <div className="first">
                <DatePicker minDate={minDate} value={new Date(scheduleTime)} onChange={(date) => this.changeDate(index, date)} />
              </div>
              <div className="second">
                <TimePicker format="ampm" value={new Date(scheduleTime)} onChange={(time) => this.changeTime(index, time)} />
              </div>
              <div className="action">
                {
                  index
                  ? <div className="close-button" onClick={() => this.removeSchedule(index)}>×</div>
                  : null
                }
              </div>
            </div>
          )
        }
        <div className="add-another" onClick={this.addSchedule}>
          + Add Another
        </div>
      </Wrapper>
    );
  }
}

export default SchedulesBlock;
