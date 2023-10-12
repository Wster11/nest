import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
// 但是不同 metadata 有不同的业务场景，有的是用于权限的，有的是用于其他场景的。
// 但现在都用 @SetMetadata 来设置太原始了。
// 我们可以像这样简写

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

// 自定义参数装饰器

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);

// 内置装饰器不够用的时候，或者想把多个装饰器合并成一个的时候，都可以自定义装饰器。
// 方法的装饰器就是传入参数，调用下别的装饰器就好了，比如对 @SetMetadata 的封装。
// 如果组合多个方法装饰器，可以使用 applyDecorators api。
// class 装饰器和方法装饰器一样。
// 还可以通过 createParamDecorator 来创建参数装饰器，它能拿到 ExecutionContext，
// 进而拿到 reqeust、response，可以实现很多内置装饰器的功能，比如 @Query、@Headers 等装饰器。

// 自定义装饰器可以让nest的代码更加灵活
