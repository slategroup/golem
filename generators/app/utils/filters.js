const filters = {
  makeLowerCase(input) {
    return input.toLowerCase();
  },
  spacesToDashes(input) {
    return input.replace(/ /g, "-");
  }
};

module.exports = filters;
