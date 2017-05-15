var my_Calendar = (function () {

  /***
   * Init the calendars creation
   * @returns {boolean}
   */
  function initCalendars() {
    var startDate = new Date(document.getElementById('startDateInput').value);
    var daysToHighlight = document.getElementById('numberOfDaysInput').value;
    //TODO add basic input validations

    //TODO create 'foreach' for each month needed to full fill the requested days amount
    document.getElementById('calendars').appendChild(_createCalendar(startDate, daysToHighlight));

    return false;
  }

  /**
   * Calculate the days amount in a month
   * @param month
   * @param year
   * @returns {*}
   * @private
   */
  function _calculateMonthDaysAmount(month, year) {
    var daysOfMonth;
    if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
      daysOfMonth = 30;
    } else {
      daysOfMonth = 31;
      if (month === 2) {
        if (year / 4 - parseInt(year / 4) !== 0) {
          daysOfMonth = 28;
        } else {
          if (year / 100 - parseInt(year / 100) !== 0) {
            daysOfMonth = 29;
          } else {
            if (year / 400 - parseInt(year / 400) !== 0) {
              daysOfMonth = 28;
            } else {
              daysOfMonth = 29;
            }
          }
        }
      }
    }
    return daysOfMonth;
  }

  /***
   * Create a monthly calendar
   * @param startDate
   * @param daysToHighlight
   * @returns {Node}
   * @private
   */
  function _createCalendar(startDate, daysToHighlight) {
    var calendarFragment = document.createDocumentFragment();
    var calendar = document.createElement('table');

    //TODO Manage the months names and days initials in a better way
    var daysHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var monthsHeaders = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(_calculateMonthDaysAmount(startDate.getMonth(), startDate.getFullYear()));

    calendar.appendChild(_createDaysHeadersRow(daysHeaders));
    calendar.appendChild(_createMonthHeader(monthsHeaders[startDate.getUTCMonth()], startDate.getFullYear()));
    calendar.appendChild(_createWeeks(startDate, daysToHighlight));

    return calendarFragment.appendChild(calendar);
  }

  /***
   * Create all the week days header
   * @param daysHeaders
   * @returns {Node}
   * @private
   */
  function _createDaysHeadersRow(daysHeaders) {
    var daysHeaderRow = document.createDocumentFragment();
    var daysHeaderRowTr = document.createElement('tr');

    daysHeaders.forEach(function (dayText) {
      var dayHeaderTh = document.createElement('th');
      dayHeaderTh.appendChild(document.createTextNode(dayText));
      daysHeaderRowTr.appendChild(dayHeaderTh)
    });
    return daysHeaderRow.appendChild(daysHeaderRowTr);
  }

  /***
   * Create Month and Year Header
   * @param month
   * @param year
   * @returns {Node}
   * @private
   */
  function _createMonthHeader(month, year) {
    var monthFragment = document.createDocumentFragment();
    var monthHeaderRowTr = document.createElement('tr');
    var monthHeaderRowTd = document.createElement('td');
    var monthHeaderText = document.createTextNode(month + ' ' + year);
    var colspan = document.createAttribute('colspan');
    colspan.value = "7";
    monthHeaderRowTd.setAttributeNode(colspan);
    monthHeaderRowTd.appendChild(monthHeaderText);
    monthHeaderRowTr.appendChild(monthHeaderRowTd);

    return monthFragment.appendChild(monthHeaderRowTr);
  }

  /**
   * Create all the weeks on a month
   * @param startDate
   * @param daysToHighlight
   * @returns {DocumentFragment}
   * @private
   */
  function _createWeeks(startDate, daysToHighlight) {
    var monthFragment = document.createDocumentFragment();
    var year = startDate.getFullYear();
    var month = startDate.getUTCMonth() + 1;
    var weeksAmount = _weeksCount(month, year);
    var monthDaysAmount = _calculateMonthDaysAmount(month, year);
    var startingMonthDayToSkip = new Date(year+ "-" + month + "-01").getDay();
    var currentDay = 0;
    var monthSettings = {
      startingMonthDayToSkip: startingMonthDayToSkip,
      monthDaysAmount: monthDaysAmount,
      currentDay: currentDay
    };
    for(var i = 1; i <= weeksAmount; i++) {
      var monthTr = document.createElement('tr');
      monthTr.appendChild(_createWeek(monthSettings));
      monthFragment.appendChild(monthTr);
    }
    return monthFragment;
  }

  /**
   * Create a weeks fragment based on the settings provided
   * @param monthSettings
   * @returns {DocumentFragment} week fragment
   * @private
   */
  function _createWeek(monthSettings) {
    var weekFragment = document.createDocumentFragment();
    for (var i = 0; i < 7; i++) {
      var dayTd = document.createElement('td');
      var dayTdTextValue = '';
      if (monthSettings.startingMonthDayToSkip <= 0 && monthSettings.monthDaysAmount > 0) {
        monthSettings.currentDay ++;
        dayTdTextValue = monthSettings.currentDay;
        monthSettings.monthDaysAmount--;
        if(i === 0 || i === 6) {
          var yellowBg = document.createAttribute('style');
          yellowBg.value = 'background-color: yellow';
          dayTd.setAttributeNode(yellowBg);
        }
      } else {
        monthSettings.startingMonthDayToSkip--;
      }

      var dayTdText = document.createTextNode(dayTdTextValue);
      dayTd.appendChild(dayTdText);
      weekFragment.appendChild(dayTd);
    }
    return weekFragment;
  }

  /**
   * Count the total weeks in a specific month
   * @param month_number
   * @param year
   * @returns {number} Weeks Amount
   * @private
   */
  function _weeksCount(month_number, year) {
      var firstOfMonth = new Date(year, month_number, 1);
      var lastOfMonth = new Date(year, month_number, 0);
      var used = firstOfMonth.getDay() + lastOfMonth.getDate();
      return Math.ceil( used / 7);
  }

  return {
    initCalendars: initCalendars
  };
})();