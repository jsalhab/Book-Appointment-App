import { useEffect, useState } from "react";
import { addAppointment, getAppointments } from "../store/actions";
import { connect } from "react-redux";
import "../styles/AddAppointments.css";
import { formatDate } from "../utils";
import { validate, validateForm } from "../utils/formValidation";

type timeSlotsType = {
  key: string;
  value: string;
  disabled: boolean;
};

interface AddAppointmentsProps {
  addAppointment(apt: any): void;
  getAppointments(e?: any): void;
  timeSlots: timeSlotsType[];
}

const AddAppointments: React.FC<AddAppointmentsProps> = ({
  addAppointment,
  getAppointments,
  timeSlots,
}) => {
  const [state, setState] = useState<{ [key: string]: any }>({
    patientName: "",
    aptDate: "",
    aptNotes: "",
    aptTime: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const [touched, setTouched] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setState({ ...state, aptDate: formatDate() });
    getAppointments(formatDate());
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setTouched({
      ...touched,
      [e.target.name]: true,
    });

    if (e.target.name === "aptDate") {
      getAppointments(e.target.value);
    }
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    const formValidation = validateForm(state, errors, touched);

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);
    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
        Object.values(state).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      let apt = {
        id: Date.now(),
        patientName: state.patientName,
        aptDate: new Date(state.aptDate).getTime(),
        aptTime: state.aptTime,
        aptNotes: state.aptNotes,
      };
      addAppointment(apt);
      getAppointments(state.aptDate);
      setState({
        patientName: "",
        aptDate: formatDate(),
        aptNotes: "",
        aptTime: "",
      });
    }
  };

  return timeSlots && timeSlots.length ? (
    <div className="card textcenter mt-3 add-apt-warpper mb-5">
      <div className="apt-heading card-header text-white">Add Appointment</div>
      <div className="card-body">
        <form id="apt-form" onSubmit={handleSubmit}>
          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="patientName"
            >
              Patient Name
            </label>
            <div className="col-md-10">
              <input
                type="text"
                id="patient-name"
                className="form-control"
                name="patientName"
                placeholder="Patient's Name"
                value={state.patientName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="error-message">
                {touched.patientName && errors.patientName}
              </span>
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptDate"
            >
              Date
            </label>
            <div className="col-md-4">
              <input
                type="date"
                id="apt-date"
                className="form-control"
                name="aptDate"
                value={state.aptDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="error-message">
                {touched.aptDate && errors.aptDate}
              </span>
            </div>
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptTime"
            >
              Time
            </label>
            <div className="col-md-4">
              <select
                className="form-control"
                value={state.aptTime}
                id="apt-time"
                name="aptTime"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">--Please choose an option--</option>
                {timeSlots.map((time: any) => (
                  <option
                    data-testid={`option-${time.value}`}
                    key={time.key}
                    value={time.value}
                    disabled={time.disabled}
                  >
                    {time.value}
                  </option>
                ))}
              </select>
              <span className="error-message">
                {touched.aptTime && errors.aptTime}
              </span>
            </div>
          </div>
          <div className="form-group form-row">
            <label className="col-md-2 text-md-right" htmlFor="aptNotes">
              Apointment Notes
            </label>
            <div className="col-md-10">
              <textarea
                className="form-control"
                aria-label="Apointment Notes"
                rows={4}
                cols={50}
                name="aptNotes"
                id="apt-notes"
                placeholder="Appointment Notes"
                value={state.aptNotes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="error-message">
                {touched.aptNotes && errors.aptNotes}
              </span>
            </div>
          </div>

          <div className="form-group form-row mb-0">
            <div className="offset-md-2 col-md-10">
              <button
                type="submit"
                id="submit-btn"
                className="apt-btn btn d-block ml-auto"
              >
                Add Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    timeSlots: state.appointmentsReducer.data.timeSlots,
  };
};

export default connect(mapStateToProps, { addAppointment, getAppointments })(
  AddAppointments
);
