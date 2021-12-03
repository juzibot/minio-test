import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.options(/^.*$/, controller.options.index);

  router.get('/', controller.home.index);
};
