import React from 'react';
import dva from 'dva';
import {  memoryHistory } from 'dva/router';
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading';
import registerServiceWorker from './utils/registerServiceWorker'
import './index.less'
function createApp(opts) {
  const app = dva(opts);
  app.model(require('./models/global').default);
  app.use(createLoading());
  app.router(require('./router/router').default);
  return app;
}
export default class Index extends React.Component {
  static getPartial() {
    let app = createApp({
      history: memoryHistory,
      initialState: {
        
      },
    });
    return {
      html: app.start()()
    };
  }
  static doctype = '<!DOCTYPE html>';

  render() {
    const { html, helper } = this.props;
    const { version } = helper.config.pkg
    return (
      <html data-scale="true">
        <head>
          <meta charSet="UTF-8"/>
          <title>igola</title>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          <meta name="apple-mobile-web-app-title" content="react"/>
          <meta content="telephone=no" name="format-detection"/>
          <meta content="email=no" name="format-detection"/>
          {/* <!-- uc强制竖屏 --> */}
          <meta name="screen-orientation" content="portrait"/>
          {/* <!-- UC强制全屏 --> */}
          <meta name="full-screen" content="yes"/>
          {/* <!-- UC应用模式 --> */}
          <meta name="browsermode" content="application"/>
          {/* <!-- QQ强制竖屏 --> */}
          <meta name="x5-orientation" content="portrait"/>
          {/* <!-- QQ强制全屏 --> */}
          <meta name="x5-fullscreen" content="true"/>
          {/* <!-- QQ应用模式 --> */}
          <meta name="x5-page-mode" content="app"/>
      
          <link rel="shortcut icon" href="https://content.igola.com/static/WEB/images/mobile/images/app-logo.png"  />
          <script type="application/javascript" src='https://gw.alipayobjects.com/os/rmsportal/uDTmsEBmTUVrpmCBozbm.js'></script>
          {/* <script type="application/javascript" dangerouslySetInnerHTML={{ __html: `!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\\S\\s]+AppleWebkit\\/(\\d{3})/i),l=o.match(/U3\\/((\\d+|\\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector(\'meta[name="viewport"]\');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);flex(100, 1);` }}/> */}
          <link rel="stylesheet" href={helper.asset('index.css')} />
          {/* <link rel="manifest" href={helper.asset('manifest.84390414.json')}/>  */}
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script src={helper.asset(`manifest.js?v=${version}`)} />
          <script src={helper.asset(`index.js?v=${version}`)} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const app = createApp({
    history: createHistory(),
    initialState: {},
  });
  // 5. Start
  app.start('#container');
  registerServiceWorker();
  // if (module.hot) {
  //   module.hot.accept((err) => { // 地址参数可以省去
  //     if (err) {
  //       console.error('Cannot apply hot update', err);
  //     }
  //     ReactDOM.render(app, document.getElementById('container'));
  //   });
  // }
}

