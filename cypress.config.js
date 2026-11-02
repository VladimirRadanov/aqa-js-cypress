const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.defaultCommandTimeout = 5000;
      config.viewportWidth = 1280;
      config.viewportHeight = 720;
    },
  },
});
