module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ["skillmirror-backend/**/*.js"],
      env: {
        node: true,
      },
    },
  ],
};
