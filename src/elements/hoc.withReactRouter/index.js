import React, { PropTypes } from 'react';

const withReactRouter = (Component) =>
  class Decorated extends React.Component {
    static propTypes = {
      activeClassName: PropTypes.string,
      className: PropTypes.string,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
    }

    static contextTypes = {
      router: PropTypes.object,
    };

    resolveToLocation = (to) => {
      const { router } = this.context;
      return typeof to === 'function' ? to(router.location) : to;
    }

    handleClick = (event) => {
      const { to } = this.props;
      const { router } = this.context;
      event.preventDefault();
      router.push(this.resolveToLocation(to));
    }

    render() {
      const { router } = this.context;
      const { activeClassName, className, to, ...rest } = this.props;
      const toLocation = this.resolveToLocation(to);
      const isActive = router.isActive(toLocation);
      const newClassName = isActive ? `${className} ${activeClassName}` : className;

      return (
        <Component
          {...rest}
          className={newClassName}
          href={toLocation}
          onClick={this.handleClick}
        />
      );
    }
  };

export default withReactRouter;
