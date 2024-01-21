import { z, ZodError } from 'zod';
import { IUserTokenPayload } from '@core';
import { UnauthorizedException } from '@nestjs/common';

const isUserTokenPayloadValid = (props: IUserTokenPayload): void => {
  const UserTokenPayloadZodSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string(),
    role: z.string(),
    iat: z.number(),
    exp: z.number(),
  });

  try {
    UserTokenPayloadZodSchema.parse(props);
    if (isTokenExpired(props.exp)) {
      throw new UnauthorizedException('Token expired');
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UnauthorizedException('Invalid token payload');
    } else {
      throw error;
    }
  }
};

const isTokenExpired = (exp: number): boolean => {
  return Date.now() > exp * 1000;
};

export { isUserTokenPayloadValid };
