module.exports = {
  env: {
    test: {
      plugins: ["require-context-hook", "@babel/plugin-transform-runtime"]
    }
  }
};
