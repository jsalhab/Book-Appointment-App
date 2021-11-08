import React from "react";
import { connect } from "react-redux";
import { deleteAppointment, getAppointments } from "../store/actions";
import { FaTimes } from "react-icons/fa/index";
import "../styles/AppointmentsList.css";

type PatientType = {
  patientName: string;
  aptNotes: string;
};

type MyAppointmentsType = {
  id: number;
  aptDate: number;
  aptTime: string;
  patient: PatientType;
};

interface AppointmentsListProps {
  myAppointments: MyAppointmentsType[];
  getAppointments(e?: any): void;
  deleteAppointment(apt: any): void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  myAppointments,
  getAppointments,
  deleteAppointment,
}) => {
  const deleteAppointmentHandler = (apt: any) => {
    deleteAppointment(apt);
    getAppointments();
  };

  return myAppointments && myAppointments.length > 0 ? (
    <div className="appointment-list item-list mb-3">
      <table className="table table-striped" id="apt-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Patient Name</th>
            <th scope="col">Notes</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {myAppointments.map((apt) => (
            <tr key={apt.id}>
              <th scope="row">
                <button
                  className="pet-delete btn btn-sm btn-danger"
                  onClick={() => deleteAppointmentHandler(apt)}
                >
                  <FaTimes />
                </button>
              </th>
              <td> {apt.patient.patientName}</td>
              <td>{apt.patient.aptNotes}</td>
              <td>{new Date(apt.aptDate).toLocaleDateString("en-US")}</td>
              <td>{apt.aptTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

const mapStateToProps = (state: any) => {
  return {
    myAppointments: state.appointmentsReducer.data.myAppointments,
  };
};

export default connect(mapStateToProps, { deleteAppointment, getAppointments })(
  AppointmentsList
);
