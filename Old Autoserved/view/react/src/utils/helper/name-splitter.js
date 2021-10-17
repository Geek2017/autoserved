export default name => {
  const splitName = name.split(',');
  return {
    lname: splitName[0],
    fname: splitName[1]
  };
};
