/* eslint-disable import/prefer-default-export */
import moment from "moment-timezone";

export const dateToLocalDate = (date) => {
  const dateFormat = "DD-MM-YYYY HH:mm";
  const testDateUtc = moment.utc(date);
  const localDate = testDateUtc.local();

  return localDate.format(dateFormat);
};
export const dateToLocalDateMin = (date) => {
  const dateFormat = "DD-MM";
  const testDateUtc = moment.utc(date);
  const localDate = testDateUtc.local();

  return localDate.format(dateFormat);
};
export const formatDateMonth = (date) => {
  const dateFormat = "D-M-YYYY";
  const testDateUtc = moment.utc(date);
  const localDate = testDateUtc.local();

  return localDate.format(dateFormat);
};
