const validators = {
  inputExists(input) {
    if (!input.trim()) {
      return "Please provide a component name";
    }
    return true;
  }
};

module.exports = validators;
