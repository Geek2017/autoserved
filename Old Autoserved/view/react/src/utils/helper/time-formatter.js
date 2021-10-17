export default value => {
  const newValue = value < 12 ? value : value === 12 ? 12 : value - 12;
  return `${Number(newValue).toFixed(0)}:00 ${value < 12 ? 'AM' : 'PM'}`;
};
