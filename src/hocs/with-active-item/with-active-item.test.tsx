import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withActiveItem from "./with-active-item";

describe(`Render withActiveItem`, () => {
  const MockComponent = (props) => {
    const {children} = props;

    return (
      <div>
        {children}
      </div>
    );
  };

  MockComponent.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ])
  };

  const MockComponentWrapped = withActiveItem(MockComponent);

  it(`withActiveItem is rendered correctly`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        activeItem = {false}
        onActiveItemChange = {() => {}}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
