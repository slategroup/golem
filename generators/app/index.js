const Generator = require('yeoman-generator')
const path = require("path")
const promptPath = path.resolve(__dirname, "prompts/prompts.js")
const { namePrompt, descriptionPrompt } = require(promptPath)

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([
      namePrompt,
      descriptionPrompt
    ])
  }

  paths() {
    this.destinationRoot(this.answers.componentName)
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(),
      this.answers
    )
  }
}

