module.exports = {
  './client/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  './server/**/*.{ts,js}': ['eslint --fix', 'prettier --write'],
};
