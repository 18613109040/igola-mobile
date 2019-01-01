// 'use strict';
// const path = require('path');
// const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
//   console.dir(defaultConfig)
//   const babelLoader = defaultConfig.module.rules[0];  
//   for (const loader of defaultConfig.module.rules) {
//     if (loader.test.test('.jsx') && loader.test.test('.js')) {
//       if (!Array.isArray(loader.use.options.plugins)) {
//         loader.use.options.plugins = [];
//       }
//       loader.use.options.plugins.push(
//         require.resolve('babel-plugin-transform-decorators-legacy')
//       );
//       break;
//     }

//   }
//   defaultConfig.resolve= {
//     ...defaultConfig.resolve,
//     extensions: ['.json', '.js', '.jsx'],
//     alias: {
//       '@':path.join(__dirname, '../client'),
//       components: path.join(__dirname, '../client/components'),
//       assets: path.join(__dirname, '../client/assets'),
//       utils: path.join(__dirname, '../client/utils'),
//       layouts: path.join(__dirname, '../client/layouts'),
//       models: path.join(__dirname, '../client/models'),
//       services: path.join(__dirname, '../client/services'),
//       pages:  path.join(__dirname, '../client/pages'),
//       router:  path.join(__dirname, '../client/router')
//     }
//   }
//   babelLoader.use.options.babelrc = true;
//   defaultConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
//   defaultConfig.plugins.push(new BundleAnalyzerPlugin())
//   return defaultConfig;
// };



'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const theme = require('../package.json').theme;
const imageLoaderConfig = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: '[name]-[hash:5].[ext]',
  },
};

const fileLoaderConfig = {
  test: [
    /\.ico$/,
    /\.svgz?$/,
    /\.png?$/,
    /\.jpe?$/,
    /\.gif?$/,
    /\.woff2?$/,
    /\.otf$/,
    /\.tiff?$/,
    /\.ttf$/,
    /\.eot$/,
    /\.midi?$/,
  ],
  loader: require.resolve('file-loader'),
  options: {
    name: '[name]-[hash:5].[ext]',
  },
};

function getCssLoaderConfig(dev, modules = false) {
  return {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      minimize: !dev,
      sourceMap: dev,
      modules,
      localIdentName: modules ? '[local]_[hash:base64:5]' : undefined,
    },
  };
}

const postCssLoaderConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
      pxtorem({ rootValue: 100, propWhiteList: [] }),
    ],
  },
};

const lessLoaderConfig = {
  loader: require.resolve('less-loader'),
  options: {
    javascriptEnabled: true,
    options: { 
      modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}
    }
  },
};

const getStyleFallbackConfig = dev => ({
  loader: require.resolve('style-loader'),
  options: {
    hmr: dev,
  },
});

function getStyleCongfigs(dev) {
  return [{
    test: /\.css$/,
    exclude: /\.module\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev), postCssLoaderConfig],
    }),
  },
  {
    test: /\.module\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev, true), postCssLoaderConfig],
    }),
  },
  {
    test: /\.s(c|a)ss$/,
    exclude: /\.module\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
        {
          loader: require.resolve('sass-loader'),
        },
      ],
    }),
  },
  {
    test: /\.module\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        {
          loader: require.resolve('sass-loader'),
        },
      ],
    }),
  },
  {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev), postCssLoaderConfig,{
        loader: 'less-loader', options: {modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}}
    } ],
    }),
  },
  {
    test: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    }),
  },
  ];
}

module.exports = (app, defaultConfig, dev = 'local') => ({
  ...defaultConfig,
  // entry: {
  //   index: [path.join(__dirname, '../client/index.jsx')],
  // },
  module: {
    ...defaultConfig.module,
    rules: [{
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: true,
          plugins: [
            require.resolve('babel-plugin-transform-decorators-legacy')
          ],
          presets: [require.resolve('babel-preset-beidou-client')],
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
    },
    ...getStyleCongfigs(dev),
    imageLoaderConfig,
    fileLoaderConfig,
    ],

  },
  plugins:[
    ...defaultConfig.plugins,
    // new BundleAnalyzerPlugin(),
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json',
    // }),
    // new SWPrecacheWebpackPlugin({
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   logger(message) {
    //     if (message.indexOf('Total precache size is') === 0) {
    //       return;
    //     }
    //     if (message.indexOf('Skipping static resource') === 0) {
    //       return;
    //     }
    //     console.log(message);
    //   },
    //   minify: true,
    //   navigateFallback:  '/index.html',
    //   navigateFallbackWhitelist: [/^(?!\/__).*/],
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    // }),
    // new WebpackPwaManifest({
    //   name: '我的测试应用', //应用名称，就是图标下面的显示名称
    //   short_name: '我的测试应用', // 应用名称，但 name 无法显示完全时候则显示这个
    //   description: 'pwa',
    //   background_color: '#333', //相应的颜色
    //   theme_color: '#333',
    //   filename: 'manifest.[hash:8].json',
    //   publicPath: '/',
    //   icons: [ //设置图标，插件会自动帮你生成不同 size 的图片，但是图片大小必须大于最大 sizes
    //     { 
    //       src: path.join(__dirname, '../client/assets/app-logo.png') , //path.resolve(constants.publicPath, 'icon.png'),
    //       sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    //       destination: path.join('icons')
    //     }
    //   ],
    //   ios: {
    //     'apple-mobile-web-app-title': 'Lindz\'s Blog',
    //     'apple-mobile-web-app-status-bar-style': '#000',
    //     'apple-mobile-web-app-capable': 'yes',
    //     'apple-touch-icon': '//xxx.com/icon.png',
    //   },
    // })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      '@':path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components'),
      assets: path.join(__dirname, '../client/assets'),
      utils: path.join(__dirname, '../client/utils'),
      layouts: path.join(__dirname, '../client/layouts'),
      models: path.join(__dirname, '../client/models'),
      services: path.join(__dirname, '../client/services'),
      pages:  path.join(__dirname, '../client/pages'),
      router:  path.join(__dirname, '../client/router')
    },
  },
})