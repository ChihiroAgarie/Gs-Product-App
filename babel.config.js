module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};

// export default function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     env: {
//       production: {
//         plugins: ['react-native-paper/babel'],
//       },
//     },
//   };
// };