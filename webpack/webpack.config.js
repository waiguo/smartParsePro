const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  mode: 'production',
  entry: {
    address_parse: [
      "../dist/address_parse.js",
    ],
  },
  output: {
    filename: "[name].min.js",
    path: resolve("../dist/min"),
    clean: true,
  },
};
