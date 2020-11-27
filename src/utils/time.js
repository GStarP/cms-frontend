export function formatDate(time) {
  return time.substr(0, 10);
}

export function formatTime(time) {
  return time.substr(11, 8);
}

export function formatTimeStamp(time) {
  return time.substr(0, 19).replace("T", " ");
}

export function formatDateObject(date) {
  let res = ''
  res += date.getFullYear() + '-'
  if (date.getMonth() + 1 < 10) {
    res += '0'
  }
  res += (date.getMonth() + 1) + '-'
  if (date.getDate() < 10) {
    res += '0'
  }
  res += date.getDate()
  return res
}

export function isToday(date) {
  return date === formatDateObject(new Date())
}

export function isNextDay(date) {
  const nextDay = new Date()
  nextDay.setDate(nextDay.getDate() + 1)
  return date === formatDateObject(nextDay)
}
