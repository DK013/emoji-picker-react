const path = require('path');
module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true // type-check stories during Storybook build
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|js|tsx)?$/,
      exclude: /node_modules\/(?!(flairup)\/).*/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require('@babel/preset-typescript').default,
              [
                require('@babel/preset-react').default,
                { runtime: 'automatic' }
              ],
              require('@babel/preset-env').default
            ]
          }
        }
      ]
    });

    return config;
  }
};
