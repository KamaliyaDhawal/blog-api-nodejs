export class ResponseBuilder {

  public static badRequest(msg: any, code?: number): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = code ? code : 400;
    rb.error = msg;
    return rb;
  }

  public static unAuthorize(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 401;
    rb.error = msg;
    return rb;
  }

  public static data(result: any, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.result = result;
    rb.msg = msg || null;
    return rb;
  }

  public static paginateData(result: Json, totalCount?: number, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.data = result;
    rb.totalCount = totalCount;
    rb.msg = msg || null;
    return rb;
  }

  public code: number;
  public msg: string;
  public error: string;
  public result: any;
  public data: any;
  public totalCount: any;
}
