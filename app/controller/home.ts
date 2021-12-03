import BaseController from './base';

/**
 * Try to access localhost:7001?word=botorange
 */
export default class HomeController extends BaseController {
  async index () {
    const { ctx } = this;
    ctx.validate({
      word: 'string',
    }, ctx.query);
    const word = ctx.query.word;
    ctx.body = `Hello World: ${word}`;
  }
}
