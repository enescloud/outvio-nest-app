import { HttpException, HttpStatus } from '@nestjs/common';

export const rateLimiterMessage = 'RateLimiterException: Too Many Requests';

/**
 * Throws a HttpException with a 429 status code, indicating that too many
 * requests were being fired within a certain time window.
 * @publicApi
 */
export class RateLimiterException extends HttpException {
  constructor(message?: string) {
    super(`${message || rateLimiterMessage}`, HttpStatus.TOO_MANY_REQUESTS);
  }
}
