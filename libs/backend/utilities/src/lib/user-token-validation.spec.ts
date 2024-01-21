import { IUserTokenPayload } from '@core';
import { isUserTokenPayloadValid } from './user-token-validation';
import { UnauthorizedException } from '@nestjs/common';

describe('isUserTokenPayloadValid', () => {
  // Should successfully validate a valid user token payload
  it('should successfully validate a valid user token payload', () => {
    const validPayload: IUserTokenPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    expect(() => isUserTokenPayloadValid(validPayload)).not.toThrow();
  });

  // Should successfully validate a valid user token payload with the minimum required properties
  it('should successfully validate a valid user token payload with the minimum required properties', () => {
    const validPayload: IUserTokenPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    expect(() => isUserTokenPayloadValid(validPayload)).not.toThrow();
  });

  // Should successfully validate a valid user token payload with additional properties
  it('should successfully validate a valid user token payload with additional properties', () => {
    const validPayload: IUserTokenPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
      // @ts-expect-error - intentionally adding property
      additionalProperty: 'additional',
    };

    expect(() => isUserTokenPayloadValid(validPayload)).not.toThrow();
  });

  it('should validate a valid user token payload, token is not expired', () => {
    const validPayload: IUserTokenPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    jest.spyOn(Date, 'now').mockReturnValue(validPayload.exp * 1000 - 1);

    expect(() => isUserTokenPayloadValid(validPayload)).not.toThrow();
  });

  // Should throw an UnauthorizedException if the token is expired
  it('should throw an UnauthorizedException if the token is expired', () => {
    const validPayload: IUserTokenPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    jest.spyOn(Date, 'now').mockReturnValue(validPayload.exp * 1000 + 1);

    expect(() => isUserTokenPayloadValid(validPayload)).toThrow(
      UnauthorizedException,
    );
  });

  // Should throw an error if the payload is missing the 'id' property
  it('should throw an error if the payload is missing the `id` property', () => {
    const invalidPayload = {
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    // @ts-expect-error - intentionally missing the 'id' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the payload is missing the 'email' property
  it('should throw an error if the payload is missing the `email` property', () => {
    const invalidPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    // @ts-expect-error - intentionally missing the 'email' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the payload is missing the 'username' property
  it('should throw an error if the payload is missing the `username` property', () => {
    const invalidPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    // @ts-expect-error - intentionally missing the 'username' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the payload is missing the 'role' property
  it('should throw an error if the payload is missing the `role` property', () => {
    const invalidPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    // @ts-expect-error - intentionally missing the 'role' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the payload is missing the 'iat' property
  it('should throw an error if the payload is missing the `iat` property', () => {
    const invalidPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      exp: Date.now() / 1000 + 3600,
    };

    // @ts-expect-error - intentionally invalid 'id' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the payload is missing the 'exp' property
  it('should throw an error if the payload is missing the `exp` property', () => {
    const invalidPayload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
    };

    // @ts-expect-error - intentionally missing the 'exp' property
    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });

  // Should throw an error if the 'id' property is not a valid UUID
  it('should throw an error if the `id` property is not a valid UUID', () => {
    const invalidPayload = {
      id: 'invalid-uuid',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    expect(() => isUserTokenPayloadValid(invalidPayload)).toThrow();
  });
});
