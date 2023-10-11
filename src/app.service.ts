import { Injectable } from '@nestjs/common';

// provider 一般都是用@Injectable()装饰的class
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
