import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withActiveItem from "./with-active-item";

import {noop} from "../../utils/utils";

configure({
  adapter: new Adapter(),
});

describe(`E2E withActiveItem tests`, () => {
  const MockComponent: React.ReactNode = () => <div />;
  const MockComponentWrapped = withActiveItem(MockComponent, null);

  it(`Should withActiveItem change activeItem`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          activeItem = {null}
          onActiveItemChange = {noop}
        />
    );

    wrapper.props().onActiveItemChange(`Item`);
    expect(wrapper.props().activeItem).toEqual(`Item`);
  });
});
