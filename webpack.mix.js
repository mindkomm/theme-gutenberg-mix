const mix = require('laravel-mix');

/**
 * Webpack Config
 */
const config = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    tinymce: 'tinymce',
    jquery: 'jQuery',
    moment: 'moment',
    lodash: 'lodash',
    'lodash-es': 'lodash',

    // Gutenberg Components
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/components': 'wp.components',
    '@wordpress/compose': 'wp.compose',
    '@wordpress/data': 'wp.data',
    '@wordpress/editor': 'wp.editor',
    '@wordpress/element': 'wp.element',
    '@wordpress/hooks': 'wp.hooks',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/plugins': 'wp.plugins'
  },
  // @link https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map'
};

mix
  // Build editor scripts.
  .react('assets/editor.js', 'build')

  // The path for mix-manifest.json
  .setPublicPath('build')

  .version([])
  .webpackConfig(config);

/**
 * Sourcemaps
 *
 * In dev, sourcemaps are inlined into the files directly.
 *
 * @link https://github.com/JeffreyWay/laravel-mix/issues/879#issuecomment-354152991
 */
if (!mix.inProduction()) {
  mix.webpackConfig(config).sourceMaps();
}
