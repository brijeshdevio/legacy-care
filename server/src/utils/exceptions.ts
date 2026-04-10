import { ERROR_CODES } from "../constants/error";
import { ApiError } from "../types/api";

export class HttpException<E = unknown> extends Error {
  public readonly status: number;
  public readonly success = false;
  public readonly code?: string;
  public readonly errors?: E;

  constructor(message: string, status: number, code?: string, errors?: E) {
    super(message);

    this.status = status;
    this.code = code;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  toResponse(): ApiError<E> {
    return {
      success: false,
      status: this.status,
      message: this.message,
      errors: this.errors,
      code: this.code,
    };
  }
}

export class BadRequestException<E = unknown> extends HttpException<E> {
  constructor(
    message = "Bad Request",
    errors?: E,
    code = ERROR_CODES.VALIDATION_ERROR,
  ) {
    super(message, 400, code, errors);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, 401, ERROR_CODES.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, 403, ERROR_CODES.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Resource Not Found") {
    super(message, 404, ERROR_CODES.NOT_FOUND);
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(message, 409, ERROR_CODES.CONFLICT);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
}
