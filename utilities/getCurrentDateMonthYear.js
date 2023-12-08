function getCurrentDateMonthYear(params) {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  let newDate = year + "-" + month + "-" + day;
}
module.exports = getCurrentDateMonthYear;
