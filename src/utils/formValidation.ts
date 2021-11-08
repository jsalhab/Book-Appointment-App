import { formatDate } from ".";

const fieldValidation = (fieldName: any, fieldValue: any) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

export const dateValidation = (fieldName: any, fieldValue: any) => {
  if (fieldValue.trim() === "") {
    return "Appointment Date is required";
  }
  if (new Date(fieldValue).getTime() < new Date(formatDate()).getTime()) {
    return "Invalid date, the date shouldn't be in the past";
  }

  return null;
};

export const validate: { [key: string]: any } = {
  patientName: (name: string) => fieldValidation("Patient Name", name),
  aptDate: (name: string) => dateValidation("Appointment Date", name),
  aptTime: (name: string) => fieldValidation("Appointment Time", name),
  aptNotes: (name: string) => fieldValidation("Appointment Notes", name),
};

export const validateForm = (state: any, errors: any, touched: any) => {
  const formValidation = Object.keys(state).reduce(
    (acc, key) => {
      const newError = validate[key](state[key]);
      const newTouched = { [key]: true };
      return {
        errors: {
          ...acc.errors,
          ...(newError && { [key]: newError }),
        },
        touched: {
          ...acc.touched,
          ...newTouched,
        },
      };
    },
    {
      errors: { ...errors },
      touched: { ...touched },
    }
  );
  return formValidation;
};
