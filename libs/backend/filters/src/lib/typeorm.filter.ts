import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { GraphQLError } from 'graphql/error';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements GqlExceptionFilter {
  catch(exception: TypeORMError) {
    switch (true) {
      case exception instanceof EntityNotFoundError:
        throw new GraphQLError('Entity not found.', {
          extensions: { code: CODES.ENTITY_NOT_FOUND },
        });
      default:
        throw new GraphQLError(exception.message, {
          extensions: { code: CODES.TYPEORM_ERROR },
        });
    }
  }
}

const CODES = {
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  TYPEORM_ERROR: 'TYPEORM_ERROR',
};
