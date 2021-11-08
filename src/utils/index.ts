export const formatDate = (date = new Date()) => {
  const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;
  return formatedDate;
};

export const selectFewerProps = (show: any) => {
  const { aptDate, aptTime } = show;
  return { aptDate, aptTime };
};
