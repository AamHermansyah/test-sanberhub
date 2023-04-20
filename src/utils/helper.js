export const getIndonesiaDateVersion = (date, config) => {
  date = new Date(date);

  let options = {
      year: 'numeric',
      month: config?.month || 'long',
      day: 'numeric',
  }
  
  if (config?.getHour) {
    options = {
      ...options,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }
  }

  let result = new Intl.DateTimeFormat('id-ID', options)
    .format(date)
    .replace(',', '');

  if (config?.getHour) {
    result = result.replace(/\./gi, ':');
  }
  
  return result;
};

// in miliseconds
var units = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365/12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export const getRelativeTime = (d1, d2 = new Date()) => {
  let elapsed = d1 - d2

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (let u in units) 
    if (Math.abs(elapsed) > units[u] || u == 'second') 
      return rtf.format(Math.round(elapsed/units[u]), u)
}