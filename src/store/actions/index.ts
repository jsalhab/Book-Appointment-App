import {
  GET_APPOINTMENTS,
  SAVE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "./types";
import { selectFewerProps } from "../../utils";

type timeSlotsType = {
  key: string;
  value: string;
  disabled: boolean;
};

export const getAppointments =
  (date: any = null) =>
  async (dispatch: any) => {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");

    appointments.forEach((apt: any) => {
      const item = patients.find((pat: any) => pat.patientName === apt.patient);
      apt.patient = item;
    });

    let timeStamps: any = appointments.map(selectFewerProps);
    let result: timeSlotsType[];
    const timeSlots: timeSlotsType[] = [
      { key: "12:00", value: "12:00", disabled: false },
      { key: "1:00", value: "1:00", disabled: false },
      { key: "2:00", value: "2:00", disabled: false },
      { key: "3:00", value: "3:00", disabled: false },
      { key: "4:00", value: "4:00", disabled: false },
    ];

    if (timeStamps) {
      result = timeStamps.filter((ts: any) => {
        return +ts.aptDate === new Date(date).getTime();
      });

      timeSlots.forEach((ts: any) => {
        if (result.find((r: any) => r.aptTime === ts.value)) {
          ts.disabled = true;
        }
      });
    }

    dispatch({
      type: GET_APPOINTMENTS,
      payload: {
        timeStamps: timeStamps,
        myAppointments: appointments,
        timeSlots: timeSlots,
      },
    });
  };

export const addAppointment = (apt: any) => async (dispatch: any) => {
  const { patientName, aptDate, aptTime, aptNotes } = apt;

  let patient = {
    patientName: patientName,
    aptNotes: aptNotes,
  };

  let appointment = {
    id: Date.now(),
    aptTime: aptTime,
    aptDate: aptDate,
    patient: patient.patientName,
  };

  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");

  appointments.unshift(appointment);
  patients.unshift(patient);

  localStorage.setItem("appointments", JSON.stringify(appointments));
  localStorage.setItem("patients", JSON.stringify(patients));
  dispatch({
    type: SAVE_APPOINTMENT,
    payload: {
      appointments: JSON.parse(localStorage.getItem("appointments") || "[]"),
      patients: JSON.parse(localStorage.getItem("patients") || "[]"),
    },
  });
};

export const deleteAppointment = (appointment: any) => {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

  const filteredAppointments = appointments.filter((apt: any) => {
    return apt.id !== appointment.id;
  });

  localStorage.setItem("appointments", JSON.stringify(filteredAppointments));
  return {
    type: DELETE_APPOINTMENT,
  };
};
