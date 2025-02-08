const formatTime = (date: Date) => {
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const [time, meridiem] = timeString.split(' ');
  return `${meridiem} ${time}`;
};

export default formatTime;
