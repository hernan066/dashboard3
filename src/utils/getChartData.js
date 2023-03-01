/* eslint-disable import/prefer-default-export */
const { dateToLocalDateMin } = require("./dateFormat");

export const getChartData = (filterOrders) => {
  const orders = filterOrders.map((order) => ({
    ...order,
    deliveryDate: dateToLocalDateMin(order.deliveryDate),
  }));

  const date = new Set(orders.map((order) => order.deliveryDate));
  const arrDate = [...date];

  console.log(arrDate);

  let res = orders.reduce((acc, act) => {
    const key = act.deliveryDate;
    // eslint-disable-next-line no-param-reassign
    acc[key] = (acc[key] || []).concat(act);

    return acc;
  }, {});

  res = Object.entries(res).map(([k, v]) => ({ [k]: v }));
  const totalPayment = [];
  const totalDebt = [];
  res.forEach((day) => {
    const [valor] = Object.values(day);
    const cash = valor.reduce((acc, curr) => acc + curr.payment.cash, 0);
    const transfer = valor.reduce((acc, curr) => acc + curr.payment.transfer, 0);
    const debt = valor.reduce((acc, curr) => acc + curr.payment.debt, 0);
    totalPayment.push(cash + transfer);
    totalDebt.push(debt);
  });

  return {
    dates: arrDate,
    totalPayment,
    totalDebt,
  };
};
