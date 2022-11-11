const fs = require('fs-extra');
const configuration = require('./build.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    config.merge({
      node: {
        fs: 'empty',
      },
    });
    const entries = Object.keys(configuration.entry) || [];
    entries.map((entry) => {
      const [scenarioName, page] = entry.split('/');
      if (page === 'index') {
        config
          .plugin(entry)
          .use(HtmlWebpackPlugin, [
            {
              inject: false,
              minify: false,
              templateParameters: {
                version,
                scenarioName
              },
              template: require.resolve('./public/index.ejs'),
              filename: `${scenarioName}/index.html`,
            },
          ]);
      }
      if (page === 'preview') {
        config
          .plugin(entry)
          .use(HtmlWebpackPlugin, [
            {
              inject: false,
              minify: false,
              templateParameters: {
                scenarioName,
              },
              template: require.resolve('./public/preview.html'),
              filename: `${scenarioName}/preview.html`,
            },
          ]);

      }
    })

    // config
    // .plugin('demo-general/index')
    // .use(HtmlWebpackPlugin, [
    //   {
    //     inject: false,
    //     minify: false,
    //     templateParameters: {
    //       version,
    //     },
    //     template: require.resolve('./demo-general/public/index.ejs'),
    //     filename: 'demo-general/index.html',
    //   },
    // ]);
    // config
    //   .plugin('demo-general/preview')
    //   .use(HtmlWebpackPlugin, [
    //     {
    //       inject: false,
    //       templateParameters: {
    //       },
    //       template: require.resolve('./demo-general/public/preview.html'),
    //       filename: 'demo-general/preview.html',
    //     },
    //   ]);

    config.plugins.delete('hot');
    config.devServer.hot(false);

    config.module // fixes https://github.com/graphql/graphql-js/issues/1272
      .rule('mjs$')
      .test(/\.mjs$/)
      .include
        .add(/node_modules/)
        .end()
      .type('javascript/auto');
  });
};
