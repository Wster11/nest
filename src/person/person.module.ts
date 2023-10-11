import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

// 在module的providers声明
// 通过provider指定注入的token, 通过useClass指定注入的对象的类
// 如果不想用构造器注入，也可以用属性注入
@Module({
  controllers: [PersonController],
  // providers: [PersonService], // 简写
  // 全写
  providers: [
    {
      provide: 'person_service',
      useClass: PersonService,
    },
    {
      provide: 'person',
      useValue: { name: 'xiaos' },
    },
  ],
})
export class PersonModule {}
