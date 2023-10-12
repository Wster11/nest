import {
  Controller,
  Get,
  UseFilters,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { Roles } from './role.decorator';
import { Role } from './role';
import { Ccc } from './aaa.decorator';

// 装饰器太多可以合并装饰器

const Bbb = (path, role) => {
  return applyDecorators(Get(path), Roles(role), UseGuards(AaaGuard));
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Bbb('hello3', Role.Admin)
  getHello3() {
    return 'gethello 3';
  }

  @Get('hello4')
  getHello4(@Ccc() ccc: string) {
    return ccc;
  }

  @Get()
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  // @UseFilters(AaaFilter) // 路由级别启用 AaaFilter，并且在 handler 里抛了一个 AaaException 类型的异常。
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
