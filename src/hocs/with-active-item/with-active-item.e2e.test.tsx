import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveItem from "./with-active-item";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E withActiveItem tests`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveItem(MockComponent, null);

  it(`Should withActiveItem change activeItem`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          activeItem = {null}
          onActiveItemChange = {() => {}}
        />
    );

    wrapper.props().onActiveItemChange(`Item`);
    expect(wrapper.props().activeItem).toEqual(`Item`);
  });
});
