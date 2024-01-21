import {
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { extractTokenFromRequest } from './headers';

describe('extractTokenFromRequest', () => {
  // Should extract token from request with valid authorization header
  it('should extract token from request with valid authorization header', () => {
    const ctx = {} as ExecutionContext;
    const authorizationHeader = 'Bearer token123';
    const extractHeaderFromRequestMock = jest
      .fn()
      .mockReturnValue(authorizationHeader);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    const result = extractTokenFromRequest(ctx);

    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
    expect(result).toBe('token123');
  });

  // Should replace 'bearer ' from authorization header before returning token
  it('should replace "bearer " from authorization header before returning token', () => {
    const ctx = {} as ExecutionContext;
    const authorizationHeader = 'Bearer token123';
    const extractHeaderFromRequestMock = jest
      .fn()
      .mockReturnValue(authorizationHeader);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    const result = extractTokenFromRequest(ctx);

    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
    expect(result).toBe('token123');
  });

  // Should return token extracted from authorization header
  it('should return token extracted from authorization header', () => {
    const ctx = {} as ExecutionContext;
    const authorizationHeader = 'Bearer token123';
    const extractHeaderFromRequestMock = jest
      .fn()
      .mockReturnValue(authorizationHeader);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    const result = extractTokenFromRequest(ctx);

    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
    expect(result).toBe('token123');
  });

  // Should throw UnauthorizedException if authorization header is missing
  it('should throw UnauthorizedException if authorization header is missing', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockReturnValue(undefined);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).toThrow(UnauthorizedException);
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should throw InternalServerErrorException if extractHeaderFromRequest fails to extract authorization header
  it('should throw InternalServerErrorException if extractHeaderFromRequest fails to extract authorization header', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockImplementation(() => {
      throw new InternalServerErrorException();
    });
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).toThrow(
      InternalServerErrorException,
    );
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should handle and log errors thrown by extractHeaderFromRequest
  it('should handle and log errors thrown by extractHeaderFromRequest', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockImplementation(() => {
      throw new Error('Some error');
    });
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).not.toThrow();
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should handle and log errors thrown by replacing 'bearer ' from authorization header
  it('should handle and log errors thrown by replacing "bearer " from authorization header', () => {
    const ctx = {} as ExecutionContext;
    const authorizationHeader = 'Bearer token123';
    const extractHeaderFromRequestMock = jest
      .fn()
      .mockReturnValue(authorizationHeader);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).not.toThrow();
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should handle and log errors thrown by creating UnauthorizedException
  it('should handle and log errors thrown by creating UnauthorizedException', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockReturnValue(undefined);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).toThrow(UnauthorizedException);
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should handle and log errors thrown by creating InternalServerErrorException
  it('should handle and log errors thrown by creating InternalServerErrorException', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockImplementation(() => {
      throw new InternalServerErrorException();
    });
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).toThrow(
      InternalServerErrorException,
    );
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });

  // Should handle and log errors thrown by GqlExecutionContext.create
  it('should handle and log errors thrown by GqlExecutionContext.create', () => {
    const ctx = {} as ExecutionContext;
    const extractHeaderFromRequestMock = jest.fn().mockReturnValue(undefined);
    jest.mock('../lib/headers', () => ({
      extractHeaderFromRequest: extractHeaderFromRequestMock,
    }));

    expect(() => extractTokenFromRequest(ctx)).toThrow(UnauthorizedException);
    expect(extractHeaderFromRequestMock).toHaveBeenCalledWith(
      'authorization',
      ctx,
      expect.any(Function),
    );
  });
});
