import { mount } from "enzyme";
import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddAppointments from "../components/AddAppointments";
import { Provider } from "react-redux";
import { store } from "../store";
import { formatDate } from "../utils";

let wrapper: any;

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <AddAppointments />
    </Provider>
  );
});

afterEach(() => {
  wrapper.unmount();
});

describe("test the add appointment form", () => {
  it("should update Patien Name field on change", async () => {
    const patientName = wrapper.find('input[name="patientName"]');
    patientName.simulate("change", {
      persist: () => {},
      target: {
        name: "patientName",
        value: "Jumana",
      },
    });
    await waitFor(() => {
      expect(patientName.html()).toMatch("Jumana");
    });
  });

  it("should update Apointment Date field on change", async () => {
    const aptDate = wrapper.find('input[name="aptDate"]');

    aptDate.simulate("change", {
      persist: () => {},
      target: {
        name: "aptDate",
        value: formatDate(),
      },
    });
    await waitFor(() => {
      expect(aptDate.html()).toMatch(formatDate());
    });
  });

  it("should update Apointment Note field on change", async () => {
    render(
      <Provider store={store}>
        <AddAppointments />
      </Provider>
    );

    await waitFor(() => {
      userEvent.type(screen.getByLabelText(/Apointment Note/i), "11.54");
    });
  });

  it("should update Apointment Time field on change", async () => {
    render(
      <Provider store={store}>
        <AddAppointments />
      </Provider>
    );
    const selectOne = screen.getByTestId("option-1:00");
    fireEvent.change(selectOne, {
      target: { value: "1:00" },
    });
    await waitFor(() => {
      expect(screen.getByText("1:00")).toBeInTheDocument();
    });
  });

  it("Add an appointment", async () => {
    const aptForm = wrapper.find("#apt-form");
    aptForm.simulate("submit");
    wrapper.update();
  });
});
