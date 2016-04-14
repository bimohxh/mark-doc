'use strict';
require("babel-polyfill");

const Koa = require('koa'),
      app = new Koa(),
      views = require('koa-views'),
      router = require('koa-router')(),
      serve = require('koa-static'),
      mount = require('koa-mount'),
      url = require('url'),
      qs = require('querystring'),
      fs = require("fs"),
      marked = require('marked'),
      menu = require('./menu');




// 静态文件服务
app.use(mount('/assets', serve(__dirname + '/assets')));

//视图处理
app.use(views(__dirname + '/views', {
  map: {
    jade: 'jade'
  }
}));

// 路由
let renderAction = async (ctx, controller, action)=> {
  let vi = controller + '/index.jade'
  let con = fs.readFileSync(__dirname + '/markdown/' + action + '.md')
  await ctx.render(vi,
    {
      params: ctx.params,
      route: {
        controller: controller,
        action: action
      },
      con: con,
      menu: menu,
      query: qs.parse(url.parse(ctx.request.url).query)
  })
}


router.get('/:action', async (ctx, next) =>{
  await renderAction(ctx, 'home', ctx.params.action)
});



router.get('/', async (ctx, next) =>{
  await renderAction(ctx, 'home', 'index')
});



app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(4000);
