const Koa = require('koa');

const app = new Koa();

const Router = require('koa-router');
const Body = require('koa-body');
const Logger = require('koa-logger');
const ResponseTime = require('koa-response-time');

app.use(ResponseTime());
app.use(Logger());
app.use(Body({
  extendTypes: {
    json: ['application/json'],
  },
}));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  ctx.set('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Authorization');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  } else {
    await next();
  }
});

const mongooseConnect = require('./libs/mongoose-connect');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('Error handler', err);
    ctx.status = err.statusCode || 500;
    ctx.body = { errors: err.errors, message: err.message };
  }
});

mongooseConnect();

const mainRouter = new Router();

mainRouter.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = 'Connected';
});

const userRouter = require('./api/routes/user-router');

app.use(mainRouter.routes());
app.use(userRouter.routes());

module.exports = app;
