/* eslint-disable import/prefer-default-export */
import moment from "moment-timezone";

export const dateToLocalDate = (date) => {
  const dateFormat = "DD-MM-YYYY HH:mm";
  const testDateUtc = moment.utc(date);
  const localDate = testDateUtc.local();

  return localDate.format(dateFormat);
};
