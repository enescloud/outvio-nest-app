import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Stage {
  dev = 'dev',
  test = 'test',
  prod = 'prod',
}

/* The class represents environment variables used in a TypeScript application. */
export class EnvironmentVariables {
  @IsEnum(Stage)
  readonly STAGE!: Stage;

  @IsString()
  readonly PORT = '3003';

  @IsString()
  readonly DATABASE_URL!: string;

  @IsString()
  readonly ACCESS_TOKEN_SECRET!: string;

  @IsNumber()
  readonly TOKEN_REQUEST_LIMIT!: number;

  @IsNumber()
  readonly IP_REQUEST_LIMIT!: number;

  @IsNumber()
  readonly REQUEST_TTL!: number;
}

/**
 * The function validates a configuration object against a predefined schema and returns the validated
 * configuration if it passes the validation, otherwise it throws an error.
 * @param config - The `config` parameter is an object that represents the configuration data for
 * environment variables. It is of type `Record<string, unknown>`, which means it is a key-value pair
 * object where the keys are strings and the values can be of any type.
 * @returns the validatedConfig, which is an instance of the EnvironmentVariables class.
 */
export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
