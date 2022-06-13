const dom = {
  calendar: document.getElementById('calendar'),
  year: document.getElementById('year')
}
  const year = new Date().getFullYear();
dom.year.innerHTML = year;

function isLeap() {
  if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)){
    return 1
  }
  return 0
}

const months = [
  {
    title: 'soaring',
    name: 'January',
    days:31
  },
  {
    title: 'centipedes',
    name: 'February',
    days:28 + isLeap(year)
  },
  {
    title: 'clarity',
    name: 'March',
    days:31
  },
  {
    title: 'violet',
    name: 'April',
    days:30
  },
  {
    title: 'crumbling',
    name: 'May',
    days:31
  },
  {
    title: 'incomparable',
    name: 'June',
    days:30
  },
  {
    title: 'metaverse',
    name: 'July',
    days:31
  },
  {
    title: 'accelerate',
    name: 'August',
    days:31
  },
  {
    title: 'premonition',
    name: 'September',
    days:30
  },
  {
    title: 'whatever',
    name: 'October',
    days:31
  },
  {
    title: 'persistence',
    name: 'November',
    days:30
  },
  {
    title: 'earthbound',
    name: 'December',
    days:31
  }
]
const holidays = [
  []
]

function isHoliday(day,month,year,cell) {
  let isHoliday = false;

  if(cell % 7 == 0 ||(cell+1) % 7 == 0) {
    return true;
  }
  holidays.forEach(date => {
    if (date[0] == day && date[1] == month && date[2] == year){
      isHoliday = true
    } 
  })
  return isHoliday
}

function renderCalendar(year) {
  for (let i = 0; i < 12; i++) {
    renderMonth(i,year);
  }
}
renderCalendar(year);

function renderMonth(monthIdx,year) {
  const month = months[monthIdx];
  const monthHeadString = buildMonthHead(month.title,month.name);
  const monthWeekDayNamesString = buildWeekDaysNames();
  const monthDates = buildDates(year,monthIdx,month.days);
  const monthBox = document.createElement('div');
  monthBox.className = 'month';
  const monthsContentHTML =  []

  monthsContentHTML.push(monthHeadString);
  monthsContentHTML.push(['<div class="month__content">']);
  monthsContentHTML.push(monthWeekDayNamesString);
  monthsContentHTML.push(monthDates);
  monthsContentHTML.push('</div>');

  monthBox.innerHTML = monthsContentHTML.join('');
  dom.calendar.appendChild(monthBox);
}


function buildMonthHead(title,monthName) {
  return `
  <div class="month__title">${title}</div>
  <div class="month__name">${monthName}</div>
  `
}

function buildWeekDaysNames() {
  const weekDayNames = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const daysNames = [];
  for (let i = 0; i < 7; i++) {
    const dayNameTag = `<div class="month__date month__date_accent">${weekDayNames[i]}</div>`
    daysNames.push(dayNameTag)
  }
  return daysNames.join('');
}

function buildDates(year,month,daysCount) {
  const date = new Date(year,month,1);
  const datesHTML = [];
  const weekDayStart = date.getDay();
  let i = 1;
  let day = 1;
  while (day <= daysCount) {
    let dateHTML;
    if(i < weekDayStart || weekDayStart == 0 && i < 7 ) {
      dateHTML = buildDate('');
      datesHTML.push(dateHTML);
    } else {
      const isHoly = isHoliday(day,month,year,i)
      dateHTML = buildDate(day,isHoly);
      datesHTML.push(dateHTML);
      day++;
    }
    i++; 
  }
  return datesHTML.join('');
}

function buildDate(content,isAccent = false) {
  const cls = isAccent ? 'month__date_accent' : 'month__date'
  return `<div class="${cls}">${content}</div>`
}
