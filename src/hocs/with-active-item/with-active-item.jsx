import React, {PureComponent} from "react";

const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: defaultActiveItem
      };

      this.handleActiveItemChange = this.handleActiveItemChange.bind(this);
    }

    handleActiveItemChange(item) {
      this.setState({activeItem: item});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem = {this.state.activeItem}
          onActiveItemChange = {this.handleActiveItemChange}
        />
      );
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
