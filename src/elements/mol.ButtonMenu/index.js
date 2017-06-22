import React, { PropTypes } from 'react';

import Menu from 'elements/atm.Menu';
import Button from 'elements/atm.Button';

class ButtonMenu extends React.Component {
  state = { active: false }
  handleButtonClick = () => this.setState({ active: !this.state.active });
  handleMenuHide = () => this.setState({ active: false });

  render() {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <Button primary onClick={this.handleButtonClick} label={this.props.label} />
        <Menu position="topLeft" active={this.state.active} onHide={this.handleMenuHide} onSelect={() => console.log('selected')}>
          { this.props.children }
        </Menu>
      </div>
    );
  }
}

ButtonMenu.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

export default ButtonMenu;
