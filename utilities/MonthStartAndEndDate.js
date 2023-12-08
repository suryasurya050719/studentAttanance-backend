let StartAndEndDate = (monthDate) => {
  var date = new Date(monthDate);
  console.log("date", date);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay.setHours(firstDay.getHours() + 5);
  firstDay.setMinutes(firstDay.getMinutes() + 30);
  console.log("firstDay", firstDay);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDay.setHours(lastDay.getHours() + 5);
  lastDay.setMinutes(lastDay.getMinutes() + 30);
  console.log("lastDay", lastDay);
  return {
    firstDay: firstDay,
    lastDay: lastDay,
  };
};
module.exports = StartAndEndDate;
