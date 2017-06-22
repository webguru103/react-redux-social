import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { values } from 'lodash';

import Wrapper from './Wrapper';
import Tag from './Tag';

class AutoMultiSelect extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    direction: PropTypes.string,
    selectedPosition: PropTypes.string,
    items: PropTypes.array,
    suggestions: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    direction: 'down',
    selectedPosition: 'above',
    items: [],
    suggestions: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      input: '',
      items: props.items,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({
        items: nextProps.items,
      });
    }
  }

  onRemove = (removedItem) => {
    const items = this.state.items.filter((item) => (item !== removedItem));
    this.setState({
      items,
    });
    this.props.onChange(items);
  }

  onQueryChange = (input) => {
    this.setState({ input });
  }

  getSuggestions = () => {
    const { items, input } = this.state;
    const { suggestions } = this.props;
    const newSuggestions = {};

    suggestions.forEach((item) => (newSuggestions[item] = item));
    values(items).forEach((item) => delete newSuggestions[item]);
    if (input && values(newSuggestions).indexOf(input) === -1) {
      newSuggestions['new-item'] = `${input} +`;
    }

    return newSuggestions;
  }

  handleChange = ([item]) => {
    const { input, items } = this.state;
    const newItems = [
      ...items,
      (item === 'new-item' ? input : item),
    ];

    this.setState({
      input: '',
      items: newItems,
    });
    this.props.onChange(newItems);
  }

  render() {
    const {
      direction,
      selectedPosition,
      disabled,
    } = this.props;

    const { items } = this.state;

    return (
      <Wrapper>
        <Autocomplete
          disabled={disabled}
          direction={direction}
          selectedPosition={selectedPosition}
          onChange={this.handleChange}
          source={this.getSuggestions()}
          value={items}
          className="auto-complete"
          onQueryChange={this.onQueryChange}
        />
        <div>
          {
            items.map((item) =>
              <Tag key={item} tag={item} remove={this.onRemove} />
            )
          }
        </div>
      </Wrapper>
    );
  }
}

export default AutoMultiSelect;
