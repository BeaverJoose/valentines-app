module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "babel-plugin-transform-optional-chaining",
    "@babel/plugin-proposal-private-property-in-object"
  ]
};