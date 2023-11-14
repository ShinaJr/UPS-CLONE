module.exports = {
  // updating the content to tell tailwind the folders and files to look out for in order for styling to take effect
  content: [`./**/*.tsx`],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};