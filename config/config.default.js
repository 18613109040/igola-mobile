'use strict';
const path = require('path');
module.exports = {
  keys: 'secret',
  react: {
    static: true,
  },
  // router: {
  //   root: 'pages',
  // },
  webpack: {
    custom: {
      configPath: path.resolve(__dirname, './webpack.config.js'),
    }
  },
  isomorphic: {
    babel: {
      plugins: [
        require.resolve('babel-plugin-dynamic-import-node'),
        require.resolve('babel-plugin-transform-decorators-legacy'),
        [require.resolve('babel-plugin-import-inspector'), {
          serverSideRequirePath: true,
        }],
        // [
        //   require.resolve('babel-plugin-import'),
        //   { libraryName: 'antd', libraryDirectory: 'es', style: true },
        // ]
      ],
      extensions: ['.js', '.jsx', '.mjs'],
    },
  },
  // 关闭scrf安全策略
  security: {
    csrf: false,
  },
  logger: {
    level: 'INFO',
  },
  alinode: {
    server: 'wss://agentserver.node.aliyun.com:8080',
    enable: true,
    appid: '77620',
    secret: 'a55640903c0d72a73e16c8dba6de03ec05e32f86',
  }
};
