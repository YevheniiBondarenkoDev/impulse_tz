import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenData } from './types';

export const ReqUser = createParamDecorator(
  (
    key: keyof TokenData,
    ctx: ExecutionContext,
  ): TokenData[keyof TokenData] | TokenData => {
    const request = ctx.switchToHttp().getRequest();
    const user: TokenData = request.user;

    return key ? user?.[key] : user;
  },
);
