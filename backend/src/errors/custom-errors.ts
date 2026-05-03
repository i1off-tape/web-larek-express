// базовый класс для всех ошибок
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// 400 Bad Request
export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

// 404 Not Found
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

// 409 Conflict
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

// 500 Internal Server Error
export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}
