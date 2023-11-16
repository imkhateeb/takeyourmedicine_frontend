export const isFutureDate = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (inputDate.toDateString() === currentDate.toDateString()) {
    return 'same';
  } else if (inputDate > currentDate) {
    return true;
  } else {
    return false;
  }
}

export const compareDates = (date1, date2) => {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  if (date1Obj.getTime() === date2Obj.getTime()) {
    return 'same';
  } else if (date1Obj < date2Obj) {
    return true;
  } else {
    return false;
  }
}