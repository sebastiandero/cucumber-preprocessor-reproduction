const { getWebpackConfig } = require('@nrwl/cypress/plugins/preprocessor');
const webpack = require('@cypress/webpack-preprocessor');


function preprocessTypescript(config) {
  if (!config.env.tsConfig) {
    throw new Error('Please provide an absolute path to a tsconfig.json as cypressConfig.env.tsConfig');
  }

  const webpackConfig = getWebpackConfig(config);

  webpackConfig.node = { fs: 'empty', child_process: 'empty', readline: 'empty' };

  webpackConfig.module.rules.push({
    test: /\.feature$/,
    use: [
      {
        loader: 'cypress-cucumber-preprocessor/loader',
      },
    ],
  });

  webpackConfig.module.rules.push({
    test: /\.features$/,
    use: [
      {
        loader: 'cypress-cucumber-preprocessor/lib/featuresLoader',
      },
    ],
  });

  return webpack({
    webpackOptions: webpackConfig,
  });
}

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config));
};

