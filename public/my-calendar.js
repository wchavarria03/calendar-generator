var my_Calendar = (function () {
  function initCalendars() {
    var startDate = new Date(document.getElementById('startDateInput').value);
    var numDays = document.getElementById('numberOfDaysInput').value;
    //TODO add basic input validations

    var initialDay = startDate.getDate();
    console.log(_calculateMonthDaysAmount(startDate.getMonth(), startDate.getFullYear()));
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //TODO create 'foreach' for each month needed to full fill the requested days amount
    document.getElementById('calendars').appendChild(_createCalendar(months[startDate.getUTCMonth()], startDate.getFullYear()));

    return false;
  }

  function _calculateMonthDaysAmount(mm, yyyy) {
    var daysOfMonth;
    if ((mm === 3) || (mm === 5) || (mm === 8) || (mm === 10)) {
      daysOfMonth = 30;
    } else {
      daysOfMonth = 31;
      if (mm === 1) {
        if (yyyy / 4 - parseInt(yyyy / 4) !== 0) {
          daysOfMonth = 28;
        } else {
          if (yyyy / 100 - parseInt(yyyy / 100) !== 0) {
            daysOfMonth = 29;
          } else {
            if (yyyy / 400 - parseInt(yyyy / 400) !== 0) {
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


  //UI functions
  function _createCalendar(month, year) {
    var calendarFragment = document.createDocumentFragment();
    var calendar = document.createElement('table');
    var daysHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    calendar.appendChild(_createDaysHeadersRow(daysHeaders));
    calendar.appendChild(_createMonthHeader(month, year));
    //calendar.appendChild(_createWeek(startDay, startValidDay));

    return calendarFragment.appendChild(calendar);
  }

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

  function _createWeek(startDay, startValidDay) {
    var weekFragment = document.createDocumentFragment();

    for (var i = 0; i < 7; i++) {
      var day = document.createElement('li');
      weekFragment.appendChild(day);
    }
  }

  return {
    initCalendars: initCalendars
  };
})();