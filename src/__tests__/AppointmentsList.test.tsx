import { mount } from "enzyme";
import AppointmentsList from "../components/AppointmentsList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

let wrapper: any;
let store;

beforeEach(() => {
  const initialState = {
    appointmentsReducer: {
      loading: false,
      data: {
        timeStamps: [
          {
            aptDate: 1636243200000,
            aptTime: "4:00",
          },
        ],
        myAppointments: [
          {
            id: 1636305909100,
            aptTime: "4:00",
            aptDate: 1636243200000,
            patient: {
              patientName: "Rami",
              aptNotes: "notes",
            },
          },
        ],
        timeSlots: [
          {
            key: "12:00",
            value: "12:00",
            disabled: false,
          },
          {
            key: "1:00",
            value: "1:00",
            disabled: false,
          },
        ],
      },
      error: "",
    },
  };

  store = mockStore(initialState);

  store.dispatch = jest.fn();

  wrapper = mount(
    <Provider store={store}>
      <AppointmentsList />
    </Provider>
  );
});

afterEach(() => {
  wrapper.unmount();
});

describe("test the list of appointments", () => {
  it("renders table without error", () => {
    expect(wrapper.find("#apt-table").length).toEqual(1);
  });
});
