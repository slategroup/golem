const path = require("path");
const utilsPath = path.resolve(__dirname, "..", "utils");
const { inputExists } = require(`${utilsPath}/validators.js`);
const { spacesToDashes } = require(`${utilsPath}/filters.js`);

const prompts = {
  namePrompt: {
    type: "input",
    name: "componentName",
    message: "What's the name of your component?",
    filter(input) {
      const lowerCaseName = input.toLowerCase();
      return spacesToDashes(lowerCaseName);
    },
    validate(input) {
      return inputExists(input);
    }
  },
  descriptionPrompt: {
    type: "input",
    name: "componentDescription",
    message: "Enter a component description (optional)"
  }
};

module.exports = prompts;
