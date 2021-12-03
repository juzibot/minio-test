import { Controller } from 'egg';

export interface PageResponse {
  current: number;
  total: number;
}

export default class BaseController extends Controller {
  public success (data?: object | any[], page?: PageResponse) {
    this.ctx.body = {
      code: 0,
    };
    if (data) {
      this.ctx.body.data = data;
    }
    if (page) {
      this.ctx.body.page = page;
    }
  }

  public fail (code: number, message: string) {
    this.ctx.body = {
      code,
      message,
    };
  }
}
