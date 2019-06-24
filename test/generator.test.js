const assert = require("assert");
const path = require("path");
const rimraf = require("rimraf");
const helpers = require("yeoman-test");
const yeomanAssert = require("yeoman-assert");

const baseAppPath = path.resolve(__dirname, "../generators/app");
const validatorsPath = path.resolve(baseAppPath, "utils/validators.js");
const { inputExists } = require(validatorsPath);

/* ----- GLOBAL MOCK VARS ----- */

const mockPrompts = {
  namePrompt: {
    type: "input",
    name: "componentName",
    message: "What's the name of your component?",
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

const mockDirectory = path.join(__dirname, mockPrompts.namePrompt.name);

/* ----- PROJECT GENERATION ----- */

describe("Scaffolding", () => {
  beforeEach(() => {
    return helpers
      .run(baseAppPath)
      .inDir(mockDirectory)
      .withPrompts(mockPrompts);
  });

  afterEach(() => {
    rimraf(mockDirectory, () => true);
  });

  it("creates the correct files", () => {
    yeomanAssert.file(path.resolve(mockDirectory, "bootstrap.yml"));
    yeomanAssert.file(path.resolve(mockDirectory, "schema.yml"));
    yeomanAssert.file(path.resolve(mockDirectory, "template.hbs"));
  });
});

/* ----- VALIDATION ----- */

describe("Validators", () => {
  describe("inputExists", () => {
    it("returns a message if input doesn't exist", () => {
      const mockInputExists = inputExists("  ");
      assert.equal(mockInputExists, "Please provide a component name");
    });

    it("returns true if input exists", () => {
      const mockInputExists = inputExists("test");
      assert.equal(mockInputExists, true);
    });
  });
});
