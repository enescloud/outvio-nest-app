/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

/* The `ParseJsonPipe` class is a TypeScript class that implements the `PipeTransform` interface and is
used to parse a JSON string into a JavaScript object. */
@Injectable()
export class ParseJsonPipe
  implements PipeTransform<string, Record<string, any>>
{
  private readonly logger = new Logger(ParseJsonPipe.name);

  transform(value: string, metadata: ArgumentMetadata): any {
    const propertyName = metadata.data;
    try {
      if (
        typeof value === 'string' &&
        (value.startsWith('{') || value.startsWith('[')) &&
        (metadata.metatype?.name === 'Object' ||
          metadata.metatype?.name === 'Array' ||
          typeof metadata.metatype?.prototype === 'object')
      ) {
        return JSON.parse(value);
      }

      return value;
    } catch (e) {
      this.logger.error(`${propertyName} contains invalid JSON. Error: `, e);
      throw new BadRequestException(`${propertyName} contains invalid JSON`);
    }
  }
}
