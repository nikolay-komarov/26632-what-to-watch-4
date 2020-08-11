import * as React from "react";
import * as renderer from "react-test-renderer";

import withActiveItem from "./with-active-item";

import {noop} from "../../utils/utils";

describe(`Render withActiveItem`, () => {
  interface MockComponentProps {
    children: React.ReactNode;
  }

  const MockComponent = (props: MockComponentProps) => {
    const {children} = props;

    return (
      <div>
        {children}
      </div>
    );
  };

  const MockComponentWrapped = withActiveItem(MockComponent, `defaultItem`);

  it(`withActiveItem is rendered correctly`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        activeItem = {false}
        onActiveItemChange = {noop}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
