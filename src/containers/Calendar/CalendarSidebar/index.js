import React, { PropTypes } from 'react';

import Checkbox from 'elements/atm.Checkbox';

import Wrapper from './Wrapper';
import UnscheduledPostSet from './UnscheduledPostSet';

class CalendarSidebar extends React.Component {

  static propTypes = {
    postSets: PropTypes.array,
    currentAccount: PropTypes.object,
    query: PropTypes.string,
    onSearch: PropTypes.func,
    onToggleFilter: PropTypes.func,
    onDelete: PropTypes.func,
  };

  state = {
    showReady: true,
    showReview: true,
    showDraft: true,
    showIdea: true,
  };

  handleChangeCheckbox = (value, event) => {
    const { onToggleFilter } = this.props;
    const filter = event.target.name;
    this.setState({
      [filter]: value,
    });
    onToggleFilter(filter, value);
  }

  render() {
    const { showReady, showReview, showDraft, showIdea } = this.state;
    const { postSets, currentAccount, query, onSearch, onDelete } = this.props;
    return (
      <Wrapper>
        <div className="cal-sidebar-search">
          <input placeholder="Search Title and Tags" value={query} onChange={(e) => onSearch(e.target.value)} />
          <i className="fa fa-search" />
        </div>
        <div className="cal-sidebar-statuses">
          <div className="cal-sidebar-title">
            Post Status
          </div>
          <Checkbox
            checked={showReady}
            label="Ready"
            name="showReady"
            onChange={this.handleChangeCheckbox}
            marginBottom={13}
            bgColor="#ABE66A"
          />
          <Checkbox
            checked={showReview}
            label="Review"
            name="showReview"
            onChange={this.handleChangeCheckbox}
            marginBottom={13}
            bgColor="#B171B5"
          />
          <Checkbox
            checked={showDraft}
            label="Draft"
            name="showDraft"
            onChange={this.handleChangeCheckbox}
            marginBottom={13}
            bgColor="#67C5E6"
          />
          <Checkbox
            checked={showIdea}
            label="Idea"
            name="showIdea"
            onChange={this.handleChangeCheckbox}
            marginBottom={13}
            bgColor="#ACB5B8"
          />
        </div>
        <div className="cal-sidebar-title">
          Unscheduled ({postSets.length})
        </div>
        <div className="cal-sidebar-unscheduled">
          {
            postSets.map((postSet) =>
              <UnscheduledPostSet
                currentAccount={currentAccount}
                key={postSet.post_set_id}
                postSet={postSet}
                onDelete={onDelete}
              />
            )
          }
        </div>
      </Wrapper>
    );
  }
}

export default CalendarSidebar;
