function messageTime(time) {
  if (time)
    return `${time.toDate().getHours()}:${
      time.toDate().getMinutes() < 10
        ? "0" + time.toDate().getMinutes()
        : time.toDate().getMinutes()
    }`;
}

function convertToDate(time) {
  if (time) return time?.toDate().toLocaleDateString();
}

function compareDate(previousTime, messageTime) {
  if (
    previousTime?.toDate().getDate() === messageTime?.toDate().getDate() &&
    previousTime?.toDate().getMonth() === messageTime?.toDate().getMonth() &&
    previousTime?.toDate().getFullYear() === messageTime?.toDate().getFullYear()
  )
    return false;
  return true;
}

function chatTimestamp(time) {
  if (time) {
    const date = time?.toDate();
    const now = new Date();

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    )
      return messageTime(time);

    return date.toLocaleDateString();
  }
}

function convertToDateReadable(time) {
  if (time) {
    const date = time.toDate();
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}

function lastSeen(time) {
  if (time) {
    const date = new Date(time);
    const now = new Date();

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    )
      return `Last seen at ${date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`;

    if (
      now.getDate() - date.getDate() === 1 &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    )
      return `Last seen yesterday at ${date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`;

    return `Last seen ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()} at ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  }
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export {
  convertToDate,
  messageTime,
  compareDate,
  convertToDateReadable,
  chatTimestamp,
  lastSeen,
};
