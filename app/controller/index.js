'use strict';

const { Controller } = require('beidou-core');

class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    this.logger.info('启动耗时 %d ms','===========');
    await ctx.render('index');
  }
}

module.exports = IndexController;
