const path = require("path");
const { generateWebpackConfig, merge } = require("shakapacker");

const baseClientWebpackConfig = generateWebpackConfig();

const commonOptions = {
  resolve: {
    extensions: [".css", ".ts", ".tsx"],
    alias: {
      // react: "preact/compat",
      // "react-dom": "preact/compat",
      "@components": path.resolve(
        "__dirname",
        "../app/javascript/src/QCP/components",
      ),
      "@utils": path.resolve("__dirname", "../app/javascript/src/QCP/utils"),
      "@services": path.resolve(
        "__dirname",
        "../app/javascript/src/QCP/services",
      ),
      "@contexts": path.resolve(
        "__dirname",
        "../app/javascript/src/QCP/contexts",
      ),
      "@api": path.resolve("__dirname", "../app/javascript/src/QCP/api"),
      "@": path.resolve("__dirname", "../app/javascript/src/QCP"),
    },
  },
  // stats: "verbose",
};

const ignoreWarningsConfig = {
  ignoreWarnings: [
    /Module not found: Error: Can't resolve 'react-dom\/client'/,
  ],
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () =>
  merge({}, baseClientWebpackConfig, commonOptions, ignoreWarningsConfig);

module.exports = commonWebpackConfig;
