const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Personnaliser la configuration avant de la retourner.
  config.resolve.alias['react-native'] = 'react-native-web';
  config.output.publicPath = '/';
  return config;
};
