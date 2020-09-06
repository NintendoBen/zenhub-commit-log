const dayInMilliseconds = 1000 * 60 * 60 * 24;

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date('Sept 1 2020 23:59:59:999');
  const difference = today - date;

  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    ,
    ,
    { value: dayPeriod },
  ] = dateTimeFormat.formatToParts(date);

  let relativeDay;
  if (difference < dayInMilliseconds) {
    relativeDay = 'Today';
  } else if (difference < dayInMilliseconds * 2) {
    relativeDay = 'Yesterday';
  } else {
    relativeDay = `${month} ${day}, ${year}`;
  }

  return `${relativeDay} at ${hour}:${minute} ${dayPeriod}`;
}

export default formatDate;
