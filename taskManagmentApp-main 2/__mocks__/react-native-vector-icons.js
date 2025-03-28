const React = require("react");
const { Text } = require("react-native");

const MockIcon = (props) => {
  return React.createElement(Text, props, props.name || "Icon");
};

module.exports = MockIcon;
module.exports.default = MockIcon;
