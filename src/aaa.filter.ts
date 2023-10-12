import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';
import { AaaException } from './AaaException';

@Catch(AaaException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    // fiter的第一个参数 就是异常对象
    // filter的第二个参数 AgumentsHost是用于切换htto、wss、rpc等上下文类型的，
    // 而且可以更具上下文类型，获取到对应的argument
    console.log('AaaFilter', exception, host);
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    }
  }
}
