const ESLint = require('eslint');

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint.ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '**/*.{js,jsx,ts,tsx}': async (files) => {
    const filteredFiles = await removeIgnoredFiles(files);

    return [
      `prettier -w ./src/**/*.{js,jsx,ts,tsx}`,
      `eslint --no-ignore --max-warnings=0 --fix ${filteredFiles}`,
    ];
  },
};
