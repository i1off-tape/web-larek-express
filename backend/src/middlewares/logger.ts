import winston from 'winston';
import expressWinston from 'express-winston';

type LoggableError = Error & {
  code?: number;
  keyValue?: unknown;
  errors?: unknown;
};

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format,
  statusLevels: true,
});

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format,
  exceptionToMeta: (err: Error) => {
    const error = err as LoggableError;

    return {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        keyValue: error.keyValue,
        errors: error.errors,
      },
    };
  },
});
