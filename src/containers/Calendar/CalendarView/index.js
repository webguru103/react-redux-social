import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Wrapper from './Wrapper';
import Toolbar from './Toolbar';
import PopupMenu from './PopupMenu';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const formats = {
  dateFormat: 'D',
};

class CalendarView extends React.Component {

  static propTypes = {
    postSets: PropTypes.array,
    currentAccount: PropTypes.object,
    onMoveEvent: PropTypes.func,
    onDeleteEvent: PropTypes.func,
  };

  state = {
    showPopup: false,
    popupPosition: { x: 0, y: 0 },
    currentPostSet: null,
  };

  eventPropGetter = (event) => {
    const { postSet } = event;
    let bgColor;
    let fgColor;
    let borderColor;

    // if the postSet is in the past, it means it's already published. Otherwise, it's an error, so don't show it
    if (moment().diff(moment.unix(postSet.schedule_time)) > 0) {
      bgColor = '#F3F6F7';
      borderColor = '#E7ECEE';
      fgColor = '#ACB5B8';
    } else {
      switch (postSet.status) {
        case '3':
          bgColor = 'rgba(171,230,106,0.5)'; // Ready
          borderColor = '#ABE76A';
          fgColor = '#65883D';
          break;
        case '5':
          bgColor = 'rgba(177,113,181,0.5)'; // Review
          borderColor = '#B171B6';
          fgColor = '#965B9A';
          break;
        case '2':
          bgColor = 'rgba(103,197,230,0.5)'; // Draft
          borderColor = '#67C5E7';
          fgColor = '#428096';
          break;
        case '6':
          bgColor = '#ACB5B8'; // Idea
          borderColor = '#ABE76A';
          fgColor = '#65883D';
          break;
        case '1':
          bgColor = '#F3F6F7';
          borderColor = '#E7ECEE';
          fgColor = '#ACB5B8';
          break;
        default:
          bgColor = 'EFEFEF'; // Same as Unscheduled (gray)
          borderColor = '#DBDFE0';
          fgColor = '#616669';
          break;
      }
    }

    const style = {
      background: bgColor,
      border: `1px solid ${borderColor}`,
      color: fgColor,
    };

    return {
      style,
    };
  }

  eventSelected = (event, e) => {
    const x = e.nativeEvent.clientX;
    const y = e.nativeEvent.clientY;
    this.setState({
      showPopup: true,
      popupPosition: { x, y },
      currentPostSet: event.postSet,
    });
  }

  dismissPopup = () => {
    this.setState({ showPopup: false });
  }

  render() {
    const { showPopup, popupPosition, currentPostSet } = this.state;
    const { postSets, onMoveEvent, onDeleteEvent, currentAccount } = this.props;

    const events = postSets.map((postSet) => ({
      postSet,
      title: postSet.title ? postSet.title : 'Untitled post',
      start: new Date(moment.unix(postSet.schedule_time)),
      end: new Date(moment.unix(postSet.schedule_time)),
    }));

    return (
      <Wrapper>
        <DragAndDropCalendar
          selectable
          popup
          events={events}
          components={{
            toolbar: Toolbar,
          }}
          formats={formats}
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={this.eventPropGetter}
          onEventDrop={onMoveEvent}
        />
        {showPopup &&
          <PopupMenu
            popupPosition={popupPosition}
            onOutsideClick={this.dismissPopup}
            onDelete={onDeleteEvent}
            postSet={currentPostSet}
            currentAccount={currentAccount}
          />
        }
      </Wrapper>
    );
  }
}

export default DragDropContext(HTML5Backend)(CalendarView);
