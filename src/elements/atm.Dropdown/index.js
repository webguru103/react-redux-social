import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FontIcon from 'react-toolbox/lib/font_icon';

const PLACEHOLDER_STRING = 'Select...';

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownLabel = styled.div`
  color: #8C9497;
`;

const DropdownControl = styled.div`
  position: relative;
  overflow: hidden;
  background-color: white;
  border: 1px solid;
  border-color: ${(props) => props.isOpen ? '#E52466' : '#C8CED0'};
  border-radius: 4px;
  box-sizing: border-box;
  color: #8C9497;
  cursor: pointer;
  outline: none;
  padding: 8px 52px 8px 10px;
  transition: all 200ms ease;
  &:hover {
    border-color: ${(props) => props.isOpen ? '#E52466' : '#8C9497'};
  }
`;

const DropdownArrow = styled.span`
  height: 36px;
  width: 20px;
  top: 0;
  right: 4px;
  line-height: 36px;
  display: block;
  position: absolute;
`;

const DropdownMenu = styled.div`
  margin-top: 3px;
  background-color: white;
  box-sizing: border-box;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.20);
  border-radius: 4px;
`;

const DropdownOption = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.isSelected ? 'white' : '#8C9497'};
  cursor: pointer;
  border-radius: 4px;
  margin: 0 auto;
  margin-right: 8px;
  margin-left: 8px;
  margin-top: 2px;
  margin-bottom: 2px;
  display: block;
  padding: 8px 10px;
  background-color: ${(props) => props.isSelected ? '#E52466' : 'white'};
  &:last-child {
    margin-bottom: 8px;
  }
  &:first-child {
    margin-top: 8px;
  }
  &:hover {
    background-color: #E52466;
    color: white;
  }
`;

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || {
        label: props.placeholder || PLACEHOLDER_STRING,
        value: '',
      },
      isOpen: false,
    };
  
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value });
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({ selected: { label: newProps.placeholder, value: '' } });
    } else {
      this.setState({ selected: { label: PLACEHOLDER_STRING, value: '' } });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  setValue(value, label) {
    const newState = {
      selected: {
        value,
        label,
      },
      isOpen: false,
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  handleMouseDown(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  buildMenu() {
    const { options } = this.props;
    const ops = options.map((option) => {
      if (option.type === 'group') {
        const groupTitle = (<div>{option.name}</div>);
        const _options = option.items.map((item) => this.renderOption(item));

        return (
          <div key={option.name}>
            {groupTitle}
            {_options}
          </div>
        );
      }

      return this.renderOption(option);
    });

    return ops.length ? ops : <div>No options found</div>;
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  }

  renderOption(option) {
    const value = option.value || option.label || option;
    const label = option.label || option.value || option;

    return (
      <DropdownOption key={value} isSelected={option === this.state.selected} onMouseDown={this.setValue.bind(this, value, label)} onClick={this.setValue.bind(this, value, label)}>
        {label}
      </DropdownOption>
    );
  }

  render() {
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
    const value = (<div>{placeHolderValue}</div>);
    const menu = this.state.isOpen ? <DropdownMenu>{this.buildMenu()}</DropdownMenu> : null;

    return (
      <DropdownWrapper>
        {this.props.label && <DropdownLabel>{this.props.label}</DropdownLabel>}
        <DropdownControl isOpen={this.state.isOpen} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <DropdownArrow isOpen={this.state.isOpen}>
            { this.state.isOpen ? <FontIcon value="keyboard_arrow_up" style={{ verticalAlign: 'middle', color: '#E52466' }} /> : <FontIcon value="keyboard_arrow_down" style={{ verticalAlign: 'middle' }} /> }
          </DropdownArrow>
        </DropdownControl>
        {menu}
      </DropdownWrapper>
    );
  }
}

Dropdown.propTypes = {
  label: React.PropTypes.string,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};
