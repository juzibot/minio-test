import { Context } from 'egg';

module.exports = () => {
  return async function errorHandler (ctx: Context, next: () => Promise<void>) {
    try {
      await next();
    } catch (err) {

      // error event triggered error log write into file
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // suppress detailed error for production env
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // read property from error object and put into response
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
