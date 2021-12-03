import { Controller } from 'egg';

export default class OptionsController extends Controller {
  public async index () {
    this.ctx.set('Access-Control-Allow-Origin', '*');
    this.ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    this.ctx.set('Access-Control-Allow-Methods', 'POST');
    this.ctx.status = 200;
  }
}
