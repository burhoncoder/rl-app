import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Roles } from './sign-in.dto';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ActiveUserType;
  },
);

export type ActiveUserType = { role: Roles };
