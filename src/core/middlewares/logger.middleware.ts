import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/* The LoggerMiddleware class is a Nest middleware that logs HTTP requests. */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(
      `Logging HTTP request ${req.method} ${req.url} ${res.statusCode} from ${req.ip}`,
    );
    next();
  }
}
