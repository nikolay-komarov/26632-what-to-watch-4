import * as React from "react";
import {Subtract} from "utility-types";

import {
  MovieType,
} from "../../types";

interface State {
  activeItem: string | MovieType;
}

interface InjectingProps {
  activeItem: string | MovieType;
  onActiveItemChange: (item: string | MovieType) => void;
}

const withActiveItem = (Component, defaultActiveItem) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>

  class WithActiveItem extends React.PureComponent<T, State> {
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

  // WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
