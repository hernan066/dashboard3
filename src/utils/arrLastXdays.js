/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */

import { formatDateMonth } from "./dateFormat";

/* eslint-disable no-undef */
export const arrLastXdays = (days) => {
  const arr = [];

  for (let index = 0; index < 30; index++) {
    const start = new Date(new Date().setDate(new Date().getDate() - days));
    arr.push(
      formatDateMonth(new Date(start.getFullYear(), start.getMonth(), start.getDate() + index))
    );
  }
  return arr;
};
