export function formatDate(time) {
  return time.substr(0, 10);
}

export function formatTime(time) {
  return time.substr(11, 8);
}

export function formatTimeStamp(time) {
  return time.substr(0, 19).replace("T", " ");
}
