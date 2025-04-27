// client/babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      // Keep any existing plugins you already have
      'react-native-reanimated/plugin',
    ],
  };
};