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

  configuring() {
    this.config.save();
  }

  writing() {
    this.destinationRoot(path.join("components", this.answers.componentName));
    this.log(this.destinationRoot());

    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(),
      this.answers
    );
  }
};
