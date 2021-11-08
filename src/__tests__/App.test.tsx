import App from "../components/App";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";

const setup = () => {
  return shallow(<App />);
};

it("renders App Component without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "app-component");
  expect(appComponent.length).toBe(1);
});
