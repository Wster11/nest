import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { Roles } from './role.decorator';
import { Role } from './role';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  // @UseFilters(AaaFilter) // 路由级别启用 AaaFilter，并且在 handler 里抛了一个 AaaException 类型的异常。
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
