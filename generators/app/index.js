const Generator = require("yeoman-generator");
const path = require("path");
const promptPath = path.resolve(__dirname, "prompts/prompts.js");
const { namePrompt, descriptionPrompt } = require(promptPath);

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.answers = await this.prompt([namePrompt, descriptionPrompt]);
  }

  writing() {
    this.destinationRoot(this.answers.componentName);

    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(),
      this.answers
    );
  }
};
