function isNumber(value) {
  const reg = /^-?\d*(\.\d*)?$/;
  if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    return true;
  } else {
    return false;
  }
}

export { isNumber };